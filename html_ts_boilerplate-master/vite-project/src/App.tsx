import { useSelector } from "react-redux"
import { useAppDispatch, useAppSelector } from "./store/hooks"
import { useState } from "react"
import { addAnimal, deleteAnimal, sortAnimals } from "./store/animalSlice"
// import './App.css'


function App() {

  const animalList = useAppSelector((state) => state.animals.animals)

  const [addBtnActive, setaddBtnActive] = useState(false)
  const [name, setName] = useState('')
  const [species, setSpecies] = useState('')
  const [image, setImage] = useState('')

  const dispatch = useAppDispatch()

  const showForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setaddBtnActive(true)
  }


 
  return (
    <div className="wrapper">
      <div><button onClick={showForm}>Add animal</button></div>
      <div className={`hidden ${addBtnActive && 'active'}`}>
          <form 
            className="wrapper"
            onSubmit={
            (e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault()
              dispatch(addAnimal({ 
                id: animalList[animalList.length -1] + 1,
                name: name, 
                species: species, 
                image: image 
              }))
              setaddBtnActive (false)
              console.log(name, species, image)
          }}>
                <label>
                    Animal
                    <br />
                    <input 
                    required
                    onChange={ 
                      (e: React.ChangeEvent<HTMLInputElement>) => { 
                        setName(e.currentTarget.value) 
                      }}/>
                </label>
                <label>
                    Picture
                    <br />
                    <input 
                    required
                    onChange={ 
                      (e: React.ChangeEvent<HTMLInputElement>) => { 
                        setImage(e.currentTarget.value) 
                      }}/>
                </label>
                <label>
                    Species
                    <br />
                    <input
                    required
                    onChange={ 
                      (e: React.ChangeEvent<HTMLInputElement>) => { 
                        setSpecies(e.currentTarget.value) 
                      }}/>
                    <br /><br />
                </label>
                <button>
                    Add</button>
            </form>
          </div>
          <div className="species">
          {animalList.map((animal) => {
              return (
                    <span 
                    className="species__text"
                    onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
                      e.preventDefault()
                      dispatch(sortAnimals({species: animal.species}))
                    }}
                    >{animal.species}</span>
              )
            })}
          </div>
          <div className="main">
            {animalList.map((animal) => {
              return (
                <div>
                  <div>
                    <img src={animal.image} alt="animal" width="100" height="100"/>
                  </div>
                  <div>
                    <span>{animal.name}</span>
                    <span>{animal.species}</span>
                  </div>
                  <div>
                    <button onClick={
                      (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                        dispatch(deleteAnimal({id: animal.id}))
                      }}>Delete</button>
                  </div>
                </div>
              )
            })}
          </div>
    </div>     
  )
}

export default App
