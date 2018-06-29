# LocalStorageRepo
A repo generator that uses only on key of the sessionStorage to store all data in a unique Array.
is write in pure ES5 and implements a comple generic CRUD.

# test quickly 
include as script for prod
```
<script>
  https://cdn.rawgit.com/pascualmg/LocalStorageRepo/master/SessionStorageRepo.js
</script>
```

include as script for devel
```
<script>
https://rawgit.com/pascualmg/LocalStorageRepo/master/SessionStorageRepo.js
</script>
```
or copypaste in console https://github.com/pascualmg/LocalStorageRepo/blob/master/LocalStorageRepo.js  

(https://stackoverflow.com/questions/6551446/can-i-run-html-files-directly-from-github-instead-of-just-viewing-their-source)

```
 function testInBrowser() {
        var TEST_REPO_ID = "id";
        var repo = (new LocalStorageRepo("logs", "id"));
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
```
