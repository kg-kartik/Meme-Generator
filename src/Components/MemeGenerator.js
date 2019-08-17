import React, {Component} from "react"

class MemeGenerator extends Component{
    constructor() {
        super()
        this.state ={
            topText : "",
            bottomText : "",
            randomImg : "http://i.imgflip.com/1bij.jpg",
            allMemeImgs : []
        }
    }
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(text=> {
            const {memes} =  text.data                 
            this.setState ({    
                allMemeImgs : memes
            })
        })    
    }
    handleClick = (event) => {
        const {name,value} =event.target //object destructuring
        this.setState ({
            [name] : value //array destructuring
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({ randomImg: randMemeImg })
    }
    render() {
        return(
            <div> 
                <form className="meme-form" onSubmit= {this.handleSubmit}>
                    <input type="text" name ="topText" placeholder ="Top Text" value = {this.state.topText} onChange= {this.handleClick} />
                    <input type="text" name="bottomText" placeholder="Bottom Text" value={this.state.bottomText} onChange={this.handleClick} />
                    <button> Generate </button>
                </form>
                <div className ="meme">
                <img src={this.state.randomImg}></img>
                <h2 className="top"> {this.state.topText} </h2>
                <h2 className="bottom"> {this.state.bottomText} </h2>
                </div>
            </div>
        )
    }
}
export default MemeGenerator