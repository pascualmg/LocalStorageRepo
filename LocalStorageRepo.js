
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
    if (!localStorage) {
        throw ("upps , navigator too old")
    } //set defaults or trhow

    this.repoNameStr = repoNameStr || function () {
        throw ("default parameter constructor repoNameStr missing")
    }
    this.metadataIdStr = metadataIdStr || function () {
        throw ("default parameter constructor metadataIdStr missing")
    }
    var voidRepo = []
    localStorage.getItem(repoNameStr) || localStorage.setItem(repoNameStr, JSON.stringify(voidRepo))
    this.repo = JSON.parse(localStorage.getItem(repoNameStr))
    //publics
    this.create = function create(item) {
        var id2Create = item[this.metadataIdStr]
        if (this._exists(this.metadataIdStr, id2Create)) {
            throw "element exists, delete first or update"
        }
        this.repo.push(item)
        this._flushRepo(this.repo);
    }
    this.read = function read(key, value) {
        return this.repo.filter(function (item) {
            //object as array dereference == 4 lazy matching id "2" like id 2
            return (item[key] == value)
        })
    }
    this.findOneById = function findOneByid(id) {
        return this.read(this.metadataIdStr, id) [0]
    }
    this.update = function update(criteria, payload) {
        //todo
    }
    this.del = function del(id) {
        if (!this._exists(id)){
            console.info("element with id " + id + "does not exist");
            return false;
        }
        
        var mutatedRepo = this.repo.filter.call(this,function(item){
            debugger;
            return item["idFoo"] != id;
        })
     
        this.repo = mutatedRepo;
        this._flushRepo(this.repo);
    }
    
    //stub not working , delete if not used
    this._indexOf = function _indexOf(id){
        var index = undefined;        
        this.repo.forEach(function(item,it){
            if(item[this.metadataIdStr] == id){
                index = it;
               }
        });
        return index;
    }
    this._exists = function _exists(key, value) {
        return this.read(key, value).length
    }
    this._flushRepo = function _flushRepo(repo) {
        localStorage.setItem(repoNameStr, JSON.stringify(repo))
    }
}

var namespace = namespace || {}
namespace.SessionStorageRepo = SessionStorageRepo

var exports = exports || {}
exports.namespace = namespace
