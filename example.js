repoFoo = (new namespace.SessionStorageRepo("foo" , "idFoo"))
try {
  repoFoo.create({idFoo:"11334", data: "8==D"})
repoFoo.create({idFoo:"11335", data: "8==D"})
repoFoo.create({idFoo:"11337", data: "8==D"})

  var ticker = 100;
  while(ticker-- >= 0){
    repoFoo.create({idFoo:ticker, data: "8==D" + ticker})
  }

}catch(e) {
  console.log(e)
}

  console.log(repoFoo.read("data", "8==D"))
  console.log(repoFoo.read("idFoo", "11334")[0])
