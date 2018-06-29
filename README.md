# One Repo in a nutShell ( LocalStorageRepo )
A repo generator that uses only on key of the sessionStorage to store all data in a unique Array.
is write in pure ES5 and implements a comple generic CRUD.

# Goals
To have a generic repo (CRUD) generator linked to one key of the LocalStorage for use it as a lightweitgt persistence system directly in the browser. 

## you can use for ...
some examples
Store all data you need indexed and easly accesible as you can do with a "repo" as in a imaginary animal clinic.
```javascript
petsRepo = new LocalStorageRepo("pets" , "name");
productRepo = new LocalStorageRepo("products", "idProduct");

petsRepo.create({name:"kytybity", specie: "cat", clinicalData:"have a large tail"});
petsRepo.create({name:"rufo", specie: "dog", clinicalData:"Wooof"});
console.log ( petsRepo.findOneById("kytybity") )
petsRepo.update({name:"kytybity", specie: "cat", clinicalData:"have no tail, we cut it"});
petsRepo.findBy("specie" , "cat");//find all cats only , no dogs.
```

but you can do some other stuff , like ... store functions as text indexed by name and rerun later ;) dont know why someone want to do this :P
```javascript
functions = new LocalStorageRepo("functions", "name")
functions.update({name:"somefunc", text: sumefunc.toString()})
eval((functions.findOneById("somefunc").text)

or if you want avoid "eval" you can do like this too ( is a bit more  hkr ... XD)
var getFooFromStorageLoL = new Function( "return " + (new LocalStorageRepo("functions", "name")).findOneById("LocalStorageRepo").text )
var foo = getFooFromStorageLoL();
//now you can use your foo as allways... 

```javascript
save an Oajax response.... and all that you wants , if it can be stored in a nutshell of course ^^
```javascript
rxjs.ajax("/my/great/stuff").subscribe(repo.create)
```

# Instalation
include as script for prod
```html
<script>
  https://cdn.rawgit.com/pascualmg/LocalStorageRepo/master/SessionStorageRepo.js
</script>
```

include as script for devel
```html
<script>
https://rawgit.com/pascualmg/LocalStorageRepo/master/SessionStorageRepo.js
</script>
```
or copypaste in console https://github.com/pascualmg/LocalStorageRepo/blob/master/LocalStorageRepo.js  

(https://stackoverflow.com/questions/6551446/can-i-run-html-files-directly-from-github-instead-of-just-viewing-their-source)


## functional load test create 1001 elements , delete 500 update 500 
```javascript
 function testInBrowser() {
        var repo = (new LocalStorageRepo("logs", "id"));
        repo.reset();
        for (var i = 1000; i >= 0; i--) {//CREATE 1001 elements
                   repo.create({id:i,data1:i, data2:i});//only requires the id
        }

        for (var i = 499; i >= 0; i--) {//DELETE 500
          repo.del(i) //uses the "id" as id
        }
        for (var metaId = 500; metaId <= 1000; metaId++) {//UPDATE 500
          repo.update({id:1, data1: i + "updated", newfields:"more data"});
        }
		
	console.log(repo.findAll())

      }
```
## Unitary test with jest
```bash
npm install
npm test
```

## Limitations
The max quote , is the max quote of a key -> value in the DataStorage in your navigator . 

