import { useEffect, useState } from "react";
import { FilterMenu } from "../main_files/FindQuestion/filter_menu";
import { Question } from "../main_files/FindQuestion/Question";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db, imageDb } from "../init-firebase";
import { getDownloadURL, ref } from "firebase/storage";



export function FindQuestion(){

    const [filter, setFilter] = useState({
        tag:"",
        title:"",
        date:""
    })

    const [data, setData] = useState([])

    useEffect(() => {
        
        const fetchData = async () => {
            const QuestionRef = collection(db, "QuestionData")
          try {
            const querySnapshot = await getDocs(QuestionRef);  
            const fetchedData = await Promise.all(
              querySnapshot.docs.map( async doc => {
              const docdata = doc.data()
              const imageID = docdata.imageId

              let imageURL = null
              if(imageID){
                const imageRef = ref(imageDb, '/files/question/' + imageID)
                try{
                imageURL = await getDownloadURL(imageRef) 
                }
                catch(error){
                  console.log("Error fetching image URL : " + error);
                }
              }
              return {id: doc.id, ...docdata, imageURL: imageURL}
          })
        );
            
            setData(fetchedData)
          } catch (error) {
            console.error("Error fetching data: ", error);
          }
          
        };
        fetchData();
      }, []);

    const DeleteQuestion = async (id) =>{
      try{
        console.log(id)
        const docRef = doc(db, "QuestionData", id)
        await deleteDoc(docRef)
        setData((prevData)=> prevData.filter((question)=>question !== id))
        console.log("Document Deleted with id : " + id)
        window.location.reload();
      }
      catch(error){
        console.error("error : " + error);
      }
    }

    const filteredQuestions = data.filter((question)=>{
        const matchTitle = question.title.toLowerCase().includes(filter.title.toLowerCase())
        const matchTags = filter.tag ? question.tags.toLowerCase() === filter.tag.toLowerCase() : true
        const matchDate = filter.date ? question.uploadDate === filter.date : true 

        return matchDate && matchTags && matchTitle
    })

    return(
        <div>
            <FilterMenu setFilter={setFilter}/>
            <div className="Question-List">
            {filteredQuestions.map((question, index)=>{
              return <Question key={index} data={question} onDelete={()=>DeleteQuestion(question.id)} />
            })}
            </div>
            
        </div>
    )
}