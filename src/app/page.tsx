"use client"
import { Button } from "@/components/ui/button";
import CloudinaryImage from "./components/cloudinary-image";
import Upload_btn from "./components/upload_btn";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { get_images } from "./components/Get_data";
import { PulseLoader } from "react-spinners";

export default function Home() {
  const [res, setres] = useState([])
  const [searchres, setsearchres] = useState([])
  const [loading, setloading] = useState(false)
  const [useres, setuseres] = useState(false)
  const [search, setsearch] = useState("")
  const [upload, setupload] = useState(false)

  async function handleRefresh(public_id:string,albumName:string,img_delete:boolean=false){
    if(!img_delete){
    const new_res:any=res.map((val:any)=>{
      if(val.public_id===public_id){
        let new_public_id=public_id.split("/")
        let orig_id=new_public_id.pop()
        return {...val,public_id:`${albumName}/${orig_id}`}
      }
      return val
    })
    setres(new_res)
  }else{
    const new_res:any=res.filter((val:any)=>val.public_id!==public_id )
    setres(new_res)
  }
  }
  async function fetch_data(){
    try{
      // setloading(true)
      const response=await get_images()
      // console.log(`Got images : ${JSON.stringify(response)}`)
      setres(response)
    }finally{
      // setloading(false)
    }

  }
  
  useEffect(() => {
    async function get_res(){
      try{
        setloading(true)
        const response=await get_images()
        setres(response)
      }finally{
        setloading(false)
        setupload(false)
      }
    }
    // setloading(true)
    get_res()
  }, [])
  

    // console.log("res...")
    // console.log(res)

    const MAX_COLUMN=4;
    function get_column(colIndex:number){
      if(useres){
          return searchres.filter((val,idx)=> idx % MAX_COLUMN ===colIndex )
      }else{
        return res.filter((val,idx)=> idx % MAX_COLUMN ===colIndex )
      }
    }

    function handleSearch(){
      if(search===""){
        setuseres(false)
        return;
      }
      // console.log("In handlesearch")
      // console.log(`Search : ${search}`)
      const new_res=res.filter((val:any)=>val.tags.includes(search))
      // console.log(`Filtered res : ${JSON.stringify(new_res)}`)
      setsearchres(new_res)
      // setuseres(true)
      // setres(new_res)
    }

  return (
    <div className={`my-5 mx-6 bg-red-00 relative h-full`}>

      <div className="flex justify-between">

      <h1 className="text-4xl font-bold">Gallery</h1>
      
      <span className="mt-3">

      <Upload_btn fetch_data={fetch_data}/>
      </span>
      </div>
      

      <div className="mt-8 flex flex-col gap-3">
      <p>Search by Tag</p>
      <div className="flex gap-5 ">

      <Input value={search} className="border-gray-500 hover:border-gray-300"  onChange={(e)=>{
        
        // console.log(`Search  : ${e.target.value}`)
        setsearch(e.target.value)}} type="text" placeholder="Search" />
      <Button variant="outline" className="border-gray-300" onClick={()=>{
        setuseres(false)
        setsearch("")
        fetch_data()
      }}>Clear</Button>
      <Button onClick={handleSearch}>Search</Button>
      </div>

      </div>
      
      
      <div className=" mt-5 bg-gray-00 grid md:grid-cols-4 grid-cols-2 gap-3  ">
        
        {!useres && !loading && res.length!==0 && 
    [get_column(0),get_column(1),get_column(2),get_column(3)].map((val,idx)=> {
      return (  <div key={idx} className="flex flex-col gap-3">
        {val.map((data:any)=>{
          return (<CloudinaryImage rmv_img={null} handleRefresh={handleRefresh} key={data.public_id} props={data} path={"/"}/>
          )}
        )}    
            </div>  )}
          )
        }

        {useres && !loading && searchres.length!==0 && 
    [get_column(0),get_column(1),get_column(2),get_column(3)].map((val,idx)=> {
      return (  <div key={idx} className="flex flex-col gap-3">
        {val.map((data:any)=>{
          return (<CloudinaryImage rmv_img={null} handleRefresh={handleRefresh} key={data.public_id} props={data} path={"/"}/>
          )}
        )}    
            </div>  )}
          )
        }


        {useres && !loading && searchres.length===0  && <div className="bg-transparent translate-x-[-50%] translate-y-[-50%] absolute top-[50vh] left-[50%]  t text-4xl font-bold ">
            No Image Found!
            
            </div>}

        {!useres && !loading && res.length===0  && <div className="bg-transparent translate-x-[-50%] translate-y-[-50%] absolute top-[50vh] left-[50%] w-full text-center sm:text-4xl text-3xl font-bold ">
            Gallery is Empty!
            
            </div>}
      </div>
      
      {loading && <div className="absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
          <PulseLoader
  color="#ffffff"
  margin={5}
  size={20}
  speedMultiplier={1.5}
/> 
      </div>}




    </div>
  );
}
