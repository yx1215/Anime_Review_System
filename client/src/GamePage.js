<<<<<<< HEAD
import React, {useEffect, useState} from 'react';
import './view/GamePage.css';
import axios from 'axios';
import Logo from './Logo';
import avatar from './image/woman.jpeg';
import anime from './image/anime.jpeg';

let animeId = null;
const link = 'http://localhost:8080';

async function getGameInfo(id){
    const info = await axios.get(`${link}/animation?id=${id}`).catch((err) => { console.log(err); });
    return info.data.results[0];
}

async function getGameComments(id){
    const info = await axios.get(`${link}/comments?id=${id}`).catch((err) => { console.log(err); });
    console.log(info);
    return info.data.results;
}

export default function GamePage(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    animeId = params.get('id');
    const [info, setInfo] = useState({});
    const [comments, setComments] = useState([]);

    useEffect(()=>{
        getGameInfo(animeId).then((result) => {
            setInfo(result);
        });
        getGameComments(animeId).then((result) => {
            setComments(result);
        });
    }, [])
    console.log(comments);

=======
import React from 'react';
import './view/GamePage.css';
import Logo from './Logo';
import avatar from './image/woman.jpeg';
import anime from './image/anime.jpeg';
export default function GamePage(){
>>>>>>> c6048575ce11ea6a244e288ee22ffe66eab0c46c
    return(
        <div className="backgroundForGamePage">
            <Logo />
            <div className="avatar">
                <img src={avatar} />
            </div>
            <div className="gameInformation">
<<<<<<< HEAD
                <div className="gameName">{info.title}</div>
                <div className="gameDetails">
                    <div className="gameImage">
                        <img src={info.img_url}/>
                    </div>
                    <div className="gameText">
                        <p>id:       {info.animeId}</p>
                        <p>aired:        {info.aired} </p>
                        <p>producer:                 {info.producer} </p>
                        <p>genre:             {info.genre}</p>
                        <p>age_rate:      {info.age_rate}</p>
                        <p>synopsis:       {info.synopsis}</p>

                    </div>
                    <div className="gameScore">
                        {info.score}
=======
                <div className="gameName">Lorem ipsum dolor sit ame</div>
                <div className="gameDetails">
                    <div className="gameImage">
                        <img src={anime}/>
                    </div>
                    <div className="gameText">
                        <p>synopsis:        Urna neque </p>
                        <p>age:                 incidunt </p>
                        <p>status:             Magna fringilla</p>
                        <p>Orci a scelerisque purus semper eget duis. Ac tincidunt vitae semper quis lectus nulla at. Nunc id cursus metus aliquam. Sed elementum tempus egestas sed sed risus pretium quam. Adipiscing
                        tristique risus nec feugiat in fermentum posuere urna nec. Integer enim neque volutpat ac tincidunt
                        vitae semper quis. Sit amet porttitor eget dolor morbi non arcu. Facilisi morbi tempus iaculis urna
                            id volutpat lacus. </p>
                        <p>Orci dapibus ultrices in iaculis nunc. Et tortor at risus viverra. Etiam non quam
                        lacus suspendisse. Eget arcu dictum varius duis. Ut diam quam nulla porttitor. Volutpat commodo sed
                        egestas egestas. Vel eros donec ac odio tempor orci dapibus. Laoreet non curabitur gravida arcu ac
                            tortor dignissim.</p>

                    </div>
                    <div className="gameScore">
                        7.4
>>>>>>> c6048575ce11ea6a244e288ee22ffe66eab0c46c
                    </div>
                </div>
                <div className="gameComments">
                    <div className="comments">Comments</div>
<<<<<<< HEAD
                    {(comments != null && comments.map((one) => (
                        <div className="gameCommentUnit">
                            <div>
                                <img src={avatar}/>
                                <div>{one.nickname}</div>
                            </div>
                        <div className="commentText">
                            {one.comments}
                        </div>
                        </div>
                    )))}
=======
                    <div className="gameCommentUnit">
                        <img src={avatar}/>
                        <div className="commentText">
                            Non diam phasellus vestibulum lorem sed risus ultricies tristique. Sollicitudin tempor id eu nisl. Sagittis orci  a scelerisque purus semper
                            eget duis at tellus.
                        </div>
                    </div>
                    <div className="gameCommentUnit">
                        <img src={avatar}/>
                        <div className="commentText">
                            Ac orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt. Enim neque volutpat ac tincidunt vitae semper quis. Eget est lorem
                            ipsum dolor sit amet consectetur adipiscing elit. Turpis tincidunt id aliquet risus. Enim ut tellus elementum sagittis vitae et leo duis.
                            Congue eu consequat ac felis donec. Pharetra pharetra massa massa ultricies mi quis hendrerit dolor. Aliquam malesuada bibendum arcu vitae
                            elementum curabitur vitae. Est ullamcorper eget nulla facilisi. Nec feugiat nisl pretium fusce.
                        </div>
                    </div>
                    <div className="gameCommentUnit">
                        <img src={avatar}/>
                        <div className="commentText">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci sagittis eu volutpat odio facilisis. Lectus urna duis convallis convallis. Sed sed risus pretium quam vulputate. Viverra maecenas accumsan lacus vel facilisis volutpat. In ornare quam viverra orci sagittis eu volutpat odio facilisis. Orci porta non pulvinar neque laoreet suspendisse interdum. In vitae turpis massa sed elementum. Arcu bibendum at varius vel pharetra vel turpis. Fames ac turpis egestas integer eget aliquet.

                            Nam libero justo laoreet sit amet. At tellus at urna condimentum mattis pellentesque id nibh tortor. Morbi tincidunt ornare massa eget. Vitae elementum curabitur vitae nunc sed velit dignissim. Tristique senectus et netus et malesuada fames ac. Mauris pharetra et ultrices neque ornare aenean. Turpis tincidunt id aliquet risus. Sed adipiscing diam donec adipiscing tristique risus nec feugiat. Nisl suscipit adipiscing bibendum est ultricies. Aenean et tortor at risus viverra. Pulvinar etiam non quam lacus suspendisse faucibus. Mauris in aliquam sem fringilla ut morbi. Ac placerat vestibulum lectus mauris ultrices eros in cursus turpis. In vitae turpis massa sed elementum tempus egestas sed sed. Morbi enim nunc faucibus a pellentesque sit. Id aliquet lectus proin nibh. Consequat mauris nunc congue nisi vitae suscipit.

                            Velit egestas dui id ornare. Mollis nunc sed id semper. Ipsum dolor sit amet consectetur adipiscing. At consectetur lorem donec massa sapien faucibus et molestie ac. Condimentum vitae sapien pellentesque habitant morbi. Tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed. Fames ac turpis egestas sed tempus urna et pharetra pharetra. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Tincidunt praesent semper feugiat nibh sed pulvinar. Id velit ut tortor pretium viverra suspendisse potenti nullam ac. Ultrices vitae auctor eu augue ut lectus arcu. Blandit massa enim nec dui nunc. Nunc sed id semper risus in hendrerit gravida. Diam vel quam elementum pulvinar etiam non. Morbi tempus iaculis urna id volutpat lacus laoreet non. In ornare quam viverra orci sagittis eu. Bibendum est ultricies integer quis auctor. Etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Libero justo laoreet sit amet cursus sit amet dictum sit.
                        </div>
                    </div>
>>>>>>> c6048575ce11ea6a244e288ee22ffe66eab0c46c
                </div>
            </div>


        </div>

    )
}
export { GamePage };
