/**
 * Repo generator that uses only one unique key of the sessionStorage
 * in a unique Objects Array . [{},{},...]
 *
 * Object pattern.
 * @param repoNameStr Repo's name , is a unique key of the sessionStorage.
 * @param metadataIdStr Is the unique key that we can use in the find operation
 * @returns {{create: create, read: (function(*, *): *), update: update, delete: del}}
 * @constructor
 */
function SessionStorageRepo(repoNameStr, metadataIdStr) {

  //asserts
  if (!sessionStorage) {
    throw("upps , navigator too old");
  }

  //set defaults or trhow
  this.repoNameStr = repoNameStr || function (){throw("default parameter constructor repoNameStr missing")};
  this.metadataIdStr = metadataIdStr || function(){throw("default parameter constructor metadataIdStr missing")};
  
  var voidRepo = [];
   sessionStorage.getItem(repoNameStr) || sessionStorage.setItem(repoNameStr, JSON.stringify(voidRepo));

  this.repo = JSON.parse(sessionStorage.getItem(repoNameStr));

  //publics
  this.create = function create(item) {
    
    if (this._exists(metadataIdStr, item.metadataIdStr)) {
        throw "element exists, delete first or update";
    }
    
    this.repo.push(item);
    sessionStorage.setItem(this.repoNameStr, JSON.stringify(this.repo));
  };

  this.read = function read(key, value) {
    return this.repo.filter(function (item) {
      return (item.key === value);
    })
  };

  this.update = function update() {
    //todo stub
  };

  this.del = function del(id) {
    this.read(this.metadataIdStr, id);
    
    
    //todo stub
  }
  
  this._exists = function _exists(key, value) {
    return this.read(key,value) === [];
  }
}


var namespace = namespace || {};
namespace.SessionStorageRepo = SessionStorageRepo;

var exports = exports || {};
exports.namespace = namespace;
