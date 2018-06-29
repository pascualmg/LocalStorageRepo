//region setup
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
function getResetedRepo() {
  var repo = new namespace.LocalStorageRepo(TEST_REPO_NAME, TEST_REPO_ID);
  repo.reset();
  return repo;
}

function getFixturedRepo() {
  var repo = new namespace.LocalStorageRepo(TEST_REPO_NAME, TEST_REPO_ID);
  for (var metaId = 0; metaId < 42; ++metaId) {
    repo.create({id: metaId, data: "fixturedData_" + metaId})
  }
  return repo;
}

//endregion
//region test
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
    it('Can create new LocalStorageRepo not exists Previous', function () {
      getResetedRepo().wipe();
      getResetedRepo();
      realRepo = window.localStorage.getItem(TEST_REPO_NAME);
      expect(realRepo).not.toBe(null);
    });
    it('Can create new LocalStorageRepo if not exist previous', function () {
      getResetedRepo();
      realRepo = window.localStorage.getItem(TEST_REPO_NAME);
      expect(realRepo).not.toBe(null);
    });
    it('fails if no default parameters', function () {
      expect(function () {
        new namespace.LocalStorageRepo(null, "some");
      }).toThrow("default parameter constructor repoNameStr missing");
      expect(function () {
        new namespace.LocalStorageRepo("some", null);
      }).toThrow("default parameter constructor metadataIdStr missing");
    });
    it('fails if try to get a repo from a key that not contains an array', function () {
      window.localStorage.setItem("non-array-key", JSON.stringify({iam: "an object not an array"}));
      expect(function () {
        new namespace.LocalStorageRepo("non-array-key", "iam");
      }).toThrow('nonsense: cant link a non-array LocalStorage key as a repo');
    });
  });
  describe('CRUD', function () {
    describe('CREATE', function () {

      it('create element if no exist', function () {
        var repo = getResetedRepo();
        repo.create({id: 100, data: "guarever"})
      });

      it('it fails if element exist ,avoid duplicates', function () {
        var repo = getResetedRepo();
        expect(function () {
          repo.create({id: 100, data: "guarever"});
          repo.create({id: 100, data: "guarever"});
        }).toThrow('element with id 100 exists, delete first or update');
      });

    });
    describe('READ', function () {
      it('findOneById is like a read(metadataIdsrt, searchvalue)', function () {
        repo = getResetedRepo();
        var fixture = {id: 100, data: "algo"};
        repo.del(fixture.id);
        repo.create(fixture);
        located = repo.findOneById(fixture.id);
        expect(located).toEqual(fixture);
      });
      it('findBy is an alias of read', function () {
        var repo = getResetedRepo();
        expect(repo.read).toBe(repo.findBy)
      });

      it('findAll returns all repo contents  ', function () {
        fixturedRepo = getFixturedRepo();
        expect(fixturedRepo.findAll()).toBe(fixturedRepo.repo)
      });
    });


    describe('indexOf', function () {
      it('when _indexOf finds a element return positive index', function () {
        var repo = getResetedRepo();
        repo.reset();
        repo.create({id: 1});
        repo.create({id: 2});
        repo.create({id: 3});

        actual = repo._indexOf(2);
        expected = 1;

        expect(actual).toBe(expected)
      });
      it('when _indexOf dont find a element return negative index voidrepo', function () {
        var repo = getResetedRepo();
        repo.create({id: 1});
        repo.create({id: 2});
        repo.create({id: 3});

        repo.reset();
        actual = repo._indexOf(2);
        expected = -1;

        expect(actual).toBe(expected)
      });
      it('when _indexOf dont find a element return negative index deletedElement', function () {
        var repo = getResetedRepo();
        repo.create({id: 1});
        repo.create({id: 2});
        repo.create({id: 3});

        repo.del(2);
        actual = repo._indexOf(2);
        expected = -1;

        expect(actual).toBe(expected)
      });

    });
    describe('UPDATE', function () {

      it('update with existent metaId works fine', function () {
        var repo = getResetedRepo();
        var originalFixture = {id: 1, data: "OriginalData"};
        var changedFixture = {id: 1, data: "Changed Data after update"};
        repo.create(originalFixture);
        repo.update(changedFixture);
        expect(repo.findOneById(originalFixture.id)).toBe(changedFixture);
      });

      it('update with non-existent metaId throws exception', function () {
        repo = getResetedRepo();
        var originalFixture = {id: 1, data: "OriginalData"};
        repo.create(originalFixture);

        var changedFixture = {nonExistentMetaId: 1, data: "Changed Data after update"};
        expect(function () {
          repo.update(changedFixture);
        }).toThrow('the payload needs a unique metaId key named: id')
      });
    });
    it('delete', function () {
      repo = getResetedRepo();
      repo.create({idArticle: "11334", data: "cosas"});
      repo.del("11334");

      deleted = repo.findOneById("11334");

      expect(deleted).toBe(undefined);
    });

    /**
     * Este test de carga se desconecta de los unitarios funciona pero no es necesario ponerlo.
     * @nota: usar la función testInBrowser para hacer prueba de carga.
     *
     *
     * test de carga pasando , se deja comentado para que no ralentice ejecución de test.
     * tiene más sentido si se ejecuta directamente en el navegador ,
     * se deja para copypastear y hacer test funcional no unitario si se quiere.
     */
    // it('crea 1001 elementos , borra 500, haz update de los restantes', function () {
    //   var repo = getResetedRepo();
    //   for (var i = 1000; i >= 0; i--) {
    //     var obj2Create = {};
    //     obj2Create[TEST_REPO_ID] = i;
    //     obj2Create["data"] = "data" + i;
    //     repo.create(obj2Create);
    //   }
    //
    //   for (var i = 499; i >= 0; i--) {
    //     repo.del(i)
    //   }
    //   for (var metaId = 500; metaId <= 1000; metaId++) {
    //     obj2Update = {};
    //     obj2Update[TEST_REPO_ID] = metaId;
    //     obj2Update["data"] = "updated data " + metaId;
    //     repo.update(obj2Update);
    //   }
    //   var expected = {};
    //   expected[TEST_REPO_ID] = 888;
    //   expected["data"] = "updated data 888";
    //
    //   expect(repo.findOneById(888)).toEqual(expected)
    // })

    /**
     * copypaste en consola de browser para hacer test de carga funcional.
     */
      function testInBrowser() {
        var TEST_REPO_ID = "id";
        var repo = (new namespace.LocalStorageRepo("logs", "id"));
        repo.reset();
        for (var i = 1000; i >= 0; i--) {
          var obj2Create = {};
          obj2Create[TEST_REPO_ID] = i;
          obj2Create["data"] = "data" + i;
          repo.create(obj2Create);
        }

        for (var i = 499; i >= 0; i--) {
          repo.del(i)
        }
        for (var metaId = 500; metaId <= 1000; metaId++) {
          var obj2Update = {};
          obj2Update[TEST_REPO_ID] = metaId;
          obj2Update["data"] = "updated data " + metaId;
          repo.update(obj2Update);
        }

      }
  });
});
//endregion
