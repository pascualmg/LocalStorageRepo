/**
 * Repo generator that uses only one unique key of the LocalStorage
 * in a unique Objects Array . [{},{},...]
 * @todo: update , findBy , findOneBy , findAll , reset
 * Object pattern.
 * @param repoNameStr Repo's name , is a unique key of the LocalStorage.
 * @param metadataIdStr Is the unique key that we can use in the find operation
 * @returns {{create: create, read: (function(*, *): *), update: update, delete: del}}
 * @constructor
 */
function LocalStorageRepo(repoNameStr, metadataIdStr) {
//region asserts
  if (!localStorage) {
    throw ("upps , navigator too old")
  }
  this.repoNameStr = repoNameStr || (function () {
    throw ("default parameter constructor repoNameStr missing")
  })();
  this.metadataIdStr = metadataIdStr || (function () {
    throw ("default parameter constructor metadataIdStr missing")
  })();
//endregion asserts
//region constructor
  var voidRepo = [];
  localStorage.getItem(repoNameStr) || localStorage.setItem(repoNameStr, JSON.stringify(voidRepo));
  this.repo = JSON.parse(localStorage.getItem(repoNameStr));

  if (!Array.isArray(this.repo)) {
      throw 'nonsense: cant link a non-array LocalStorage key as a repo';
  }
//endregion constructor
//region Functions
  //region publics
  this.reset = function reset() {
    var voidRepo = [];
    this.repo = voidRepo;
    this._flushRepo(this.repo);
  };

  /**
   *
   * @param item {Object} to create , this object needs a unique key field id.
   */
  this.create = function create(item) {
    var id2Create = item[this.metadataIdStr];
    if (this._exists(id2Create)) {
      throw "element with " + this.metadataIdStr + " " + id2Create + " exists, delete first or update"
    }
    this.repo.push(item);
    this._flushRepo(this.repo)
  };
  this.read = function read(key, value) {
    return this.repo.filter(function (item) {
      return (item[key] == value)//lazy comparation
    })
  };
  this.update = function update(payload) {
    var metaId = payload[this.metadataIdStr] || (function trhowException(metadataIdStr) {
      throw 'the payload needs a unique metaId key named: ' + metadataIdStr;
    })(this.metadataIdStr);
    if (this._exists(metaId)) {
      this.del(metaId);
    }
    this.create(payload)
  };
  this.del = function del(metaId) {
    if (!this._exists(metaId)) {
      console.info("element with id " + metaId + "does not exist");
      return false
    }
    this.repo = this.repo.filter(function (item) {
      return item[this.metadataIdStr] != metaId//lazy compraration
    }, this);
    this._flushRepo(this.repo)
  };
  /**
   * @caution this deletes the key of the localStorage and all the data, use reset instead.
   */
  this.wipe = function wipe() {
    window.localStorage.removeItem(this.metadataIdStr);
  };
//endregion publics
  //region privates
  this.findOneById = function findOneByid(id) {
    return this.read(this.metadataIdStr, id) [0]
  };
  this.findBy = this.read;
  this.findAll = function findAll() {
    return this.repo;
  };
  this.findOneBy = function findOneBy(arbitraryInternalField, filterValue) {
  };
  this._indexOf = function _indexOf(id) {
    var index = -1;//historical reasons.
    this.repo.forEach(function (item, it) {
      if (item[this.metadataIdStr] == id) {
        index = it
      }
    }, this);
    return index
  };
  this._exists = function _exists(metaId) {
    return (this._indexOf(metaId)) >= 0;
  };
  this._flushRepo = function _flushRepo(repo) {
    localStorage.setItem(repoNameStr, JSON.stringify(repo))
  }
  //endregion privates
//endregion Functions
}
var namespace = namespace || {}
namespace.LocalStorageRepo = LocalStorageRepo

var exports = exports || {}
exports.namespace = namespace
