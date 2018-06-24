# SessionStorageRepo
A repo generator that uses only on key of the sessionStorage to store all data in a unique Array.
is write in pure ES5 and implements a comple generic CRUD.

# test quickly 
include as script for prod
```
<script>
  https://cdn.rawgit.com/pascualmg/SessionStorageRepo/master/SessionStorageRepo.js
</script>
```

include as script for devel
```
<script>
https://rawgit.com/pascualmg/SessionStorageRepo/master/SessionStorageRepo.js
</script>
```

(https://stackoverflow.com/questions/6551446/can-i-run-html-files-directly-from-github-instead-of-just-viewing-their-source)

```

repoFoo = (new namespace.SessionStorageRepo('foo', 'idFoo'))
try {
  //fixtures
  for (i = 100; i >= 0; i--) {
    repoFoo.create({
      idFoo: i,
      data: "data" + i
    })
  }
} catch (e) {
  console.log(e)
}
console.log(repoFoo.read('data', '8==D'))
console.log(repoFoo.read('idFoo', '11334') [0])
```
