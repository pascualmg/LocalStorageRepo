repoFoo = (new namespace.SessionStorageRepo('foo', 'idFoo'))
try {
  //fixtures
  for (i = 1000; i >= 0; i--) {
    repoFoo.create({
      idFoo: i,
      data: 'data' + i
    })
  }
} catch (e) {
  console.log(e)
}
console.log(repoFoo.read('data', '8==D'))
console.log(repoFoo.read('idFoo', '999') [0])

  for (i = 500; i >= 0; i--) {
    repoFoo.del(i)
  }

