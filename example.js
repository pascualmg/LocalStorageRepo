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
