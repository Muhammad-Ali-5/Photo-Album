
let public_id="Rose/dmnolvtjfimomrby524s"
console.log(`Public id : ${public_id}`)
let parts=public_id.split("/")
console.log(`Parts : ${parts}`)
if(parts.length>1){
    console.log(`Parts 0 slice : ${parts[0]}`)
  parts=parts.slice(1)
  console.log(`Parts slice : ${parts}`)
}
public_id=parts.join("/")
console.log(`Public id new : ${public_id}`)