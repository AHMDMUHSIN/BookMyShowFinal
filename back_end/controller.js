import movie_schema from "./model/movie.model.js";
import user_schema from "./model/user.model.js"
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
const { sign } = pkg;





////////////////MOVIE-OPERATION///////////////


export async function AddMovie(req, res) {
  try {
    const { ...Movie } = req.body;
    res.status(201).send(movie_schema.create({ ...Movie }));
  } catch (error) {
    res.status(404).send(error);
  }
}

export async function getMovie(req, res) {
  let Movie = await movie_schema.find();
  res.status(200).send(Movie);
}

export async function getDetails(req, res) {
  const { id } = req.params;
  let Movie = await movie_schema.findOne({ _id: id });
  res.status(200).send(Movie);
}

export function deleteMovie(req, res) {
  const { id } = req.params;
  const data = movie_schema.deleteOne({ _id: id });
  data
    .then((resp) => {
      res.status(200).send(resp);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
}

export async function editDetails(req, res) {
  const { id } = req.params;
  console.log(id);
  const { ...movie } = req.body;
  await movie_schema.updateOne({ _id: id }, { $set: { ...movie } });

  res.status(201).send("updated")
}


/////////////////USER-OPERATION//////////////////


export async function addUser(req,res)
{
    
    try{
       
        const {name,user,password}=req.body;
        console.log(name,user,password);
        const usr = await user_schema.findOne({ user });
        if (usr) return res.status(404).send({msg:"Username already exist"});
        if(!(name,user&&password))
        return res.status(400).send("fields are empty")

        bcrypt.hash(password,10)
        .then((hashedpwd)=>{
          user_schema.create({name,user,password:hashedpwd});
        })
        .then(()=>{
            res.status(201).send("successfully registered")
        })
        .catch((error)=>{
            res.status(500).send(error)
        })
    }
    catch(error){
        console.log(error);
    }
  
    
}

export async function login(req,res)
{
    console.log(req.body);
    const{ user,password}=req.body;
    const usr=await user_schema.findOne({user})
    console.log(usr);

    if(usr===null) return res.status(404).send("username or password doesnot exist ");
    const success=await bcrypt.compare(password,usr.password)
    console.log(success);

    if(success!==true) return res.status(404).send("username or password doesnot exist ");
    const token=await sign({user},process.env.JWT_KEY,{expiresIn:"24h"})
    console.log(token);
    res.status(200).send({msg:"succcesfully login",token})
    res.end();
}

export async function home(req,res)
{

    try{
        console.log(req.user);
        const user=req.user.user
        console.log(user);
        res.status(200).send({msg:`Hey, ${user}`})

    }catch (error) {
        res.status(404).send(error)
    }


}
