
var namespace = require('./LocalStorageRepo.js').namespace;
var TEST_REPO_NAME = 'foo';
var TEST_REPO_ID = 'id';

(function IIFE_setup_local_storage() {
  if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    window.localStorage = new LocalStorage('./scratch');
  }
})();

/**
 * Helper that creates and get a predefined repo
 * @returns {LocalStorageRepo|*}
 */
function getTestRepo() {
  return new namespace.LocalStorageRepo(TEST_REPO_NAME, TEST_REPO_ID);
}

describe('one repo in a nutshell', function () {
  describe('functional Integrity and asserts', function () {
    it('fails if no LocalStorage detected', function () {
      var save = window.localStorage;    //la guardamos
      expect(function () {
        window.localStorage = null;   //nos la cargamos
        new namespace.LocalStorageRepo(TEST_REPO_NAME, TEST_REPO_ID)
      }).toThrow("upps , navigator too old");
      window.localStorage = save; //restauramos
    });
    it('i can create new LocalStorageRepo', function () {
      getTestRepo();
      realRepo = window.localStorage.getItem(TEST_REPO_NAME);
      expect(realRepo).not.toBe(null);
    });

    it('fails if no default parameters', function () {
      expect(function () {
      new namespace.LocalStorageRepo(null,null);
      }).toThrow()
    });
  });
  describe('CRUD', function () {
    describe('CREATE', function () {

      it('create element if no exist', function () {
        getTestRepo().del(100);
        getTestRepo().create({id: 100, data: "guarever"})
      });

      it('it fails if element exist ,avoid duplicates', function () {
        expect(function () {
          getTestRepo().create({id: 100, data: "guarever"})
          getTestRepo().create({id: 100, data: "guarever"})
          getTestRepo().create({id: 100, data: "guarever"})
          getTestRepo().create({id: 100, data: "guarever"})
        }).toThrow();
      });

    });
    describe('READ', function () {
      it('findOneById', function () {
        var fixture = {id: 100, data:"algo"};
        getTestRepo().del(fixture.id);
        getTestRepo().create(fixture);
        located = getTestRepo().findOneById(fixture.id);
        expect(located).toEqual(fixture);
      });
    });

    it('update', function () {
    });
    it('delete', function () {
    });

    it('cosas', function () {
      repo = getTestRepo();
      try {
        //fixtures
        for (i = 1000; i >= 0; i--) {
          repo.create({
            idFoo: i,
            data: 'data' + i
          })
        }
      } catch (e) {
      }

      for (i = 500; i >= 0; i--) {
        repo.del(i)
      }
    })
  });
});
