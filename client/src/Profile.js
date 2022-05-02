import React, {useEffect, useState} from 'react';
import './view/Profile.css'
import Logo from './Logo';
import female from "./image/woman.jpeg";
import male from "./image/male.jpeg";
import unknown from "./image/unknown.jpeg";
import anime from './image/anime.jpeg';
import AnimeDisplayed from "./AnimeDisplayedUnit";
import axios from "axios";
import ResultUnit from "./resultUnit";

let userId;
let avatar;
const link = 'http://localhost:8080';

async function getUserInfo(id){
    const info = await axios.get(`${link}/search/single_user?userId=${id}`).catch((err) => { console.log(err); });
    return info.data.results[0];
}

function setupAnimes(nameList, imgList){
    var nList = nameList.split(",");
    var iList = imgList.split(",");
    var result = [];
    for(var i = 0; i< nList.length; i++){
        result.push({
            name:nList[i].trim(),
            img: iList[i].trim()
        })
    }
    console.log(result);
    return result;
}
export default function Profile() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    userId = params.get('userId');
    const [info, setInfo] = useState({});
    const [animeInfo, setAnimeInfo] = useState([]);
    if(!window.sessionStorage.getItem('username')){
        window.location.replace("/login");
    }
    useEffect(()=>{
        getUserInfo(userId).then((result) => {
            setInfo(result);
            if(result.gender==="Male"){
                avatar=male;
            }else if(result.gender==="Female"){
                avatar=female;
            }else{
                avatar=unknown;
            }
            setAnimeInfo(setupAnimes(result.likeAnime, result.likeAnimeImg));
        });
    }, [])
    console.log(info);

    return (
        <div className="body">
            <Logo />
            <div className="profile">
                <div className="profileAvatar">
                   <img src={avatar} />
                    <div className="profileName">{info.nickname}</div>
                </div>
                <div className="profileInfo">
                    <div className="typeText">Recent Liked</div>
                    <div className="profileList">
                        {(animeInfo != null && animeInfo.map((one) => (
                            <AnimeDisplayed animeImg={one.img} name={one.name} />
                        )))}
                        {/*{(info!=={}&&[...Array(3)].map((x, i) =>*/}
                        {/*    <AnimeDisplayed animeImg={anime} name={info.likeAnime[i]} />*/}
                        {/*))}*/}
                    </div>

                </div>

                <div className="profileInfo">
                    <div className="typeText">Recent Commented</div>
                    <div className="commentHistoryUnit">
                        <img src={avatar}/>
                        <div className="commentHistoryText">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci sagittis eu volutpat odio facilisis. Lectus urna duis convallis convallis. Sed sed risus pretium quam vulputate. Viverra maecenas accumsan lacus vel facilisis volutpat. In ornare quam viverra orci sagittis eu volutpat odio facilisis. Orci porta non pulvinar neque laoreet suspendisse interdum. In vitae turpis massa sed elementum. Arcu bibendum at varius vel pharetra vel turpis. Fames ac turpis egestas integer eget aliquet.

                            Nam libero justo laoreet sit amet. At tellus at urna condimentum mattis pellentesque id nibh tortor. Morbi tincidunt ornare massa eget. Vitae elementum curabitur vitae nunc sed velit dignissim. Tristique senectus et netus et malesuada fames ac. Mauris pharetra et ultrices neque ornare aenean. Turpis tincidunt id aliquet risus. Sed adipiscing diam donec adipiscing tristique risus nec feugiat. Nisl suscipit adipiscing bibendum est ultricies. Aenean et tortor at risus viverra. Pulvinar etiam non quam lacus suspendisse faucibus. Mauris in aliquam sem fringilla ut morbi. Ac placerat vestibulum lectus mauris ultrices eros in cursus turpis. In vitae turpis massa sed elementum tempus egestas sed sed. Morbi enim nunc faucibus a pellentesque sit. Id aliquet lectus proin nibh. Consequat mauris nunc congue nisi vitae suscipit.

                            Velit egestas dui id ornare. Mollis nunc sed id semper. Ipsum dolor sit amet consectetur adipiscing. At consectetur lorem donec massa sapien faucibus et molestie ac. Condimentum vitae sapien pellentesque habitant morbi. Tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed. Fames ac turpis egestas sed tempus urna et pharetra pharetra. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Tincidunt praesent semper feugiat nibh sed pulvinar. Id velit ut tortor pretium viverra suspendisse potenti nullam ac. Ultrices vitae auctor eu augue ut lectus arcu. Blandit massa enim nec dui nunc. Nunc sed id semper risus in hendrerit gravida. Diam vel quam elementum pulvinar etiam non. Morbi tempus iaculis urna id volutpat lacus laoreet non. In ornare quam viverra orci sagittis eu. Bibendum est ultricies integer quis auctor. Etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Libero justo laoreet sit amet cursus sit amet dictum sit.
                        </div>
                    </div>
                    <div className="commentHistoryUnit">
                        <img src={avatar}/>
                        <div className="commentHistoryText">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci sagittis eu volutpat odio facilisis. Lectus urna duis convallis convallis. Sed sed risus pretium quam vulputate. Viverra maecenas accumsan lacus vel facilisis volutpat. In ornare quam viverra orci sagittis eu volutpat odio facilisis. Orci porta non pulvinar neque laoreet suspendisse interdum. In vitae turpis massa sed elementum. Arcu bibendum at varius vel pharetra vel turpis. Fames ac turpis egestas integer eget aliquet.

                            Nam libero justo laoreet sit amet. At tellus at urna condimentum mattis pellentesque id nibh tortor. Morbi tincidunt ornare massa eget. Vitae elementum curabitur vitae nunc sed velit dignissim. Tristique senectus et netus et malesuada fames ac. Mauris pharetra et ultrices neque ornare aenean. Turpis tincidunt id aliquet risus. Sed adipiscing diam donec adipiscing tristique risus nec feugiat. Nisl suscipit adipiscing bibendum est ultricies. Aenean et tortor at risus viverra. Pulvinar etiam non quam lacus suspendisse faucibus. Mauris in aliquam sem fringilla ut morbi. Ac placerat vestibulum lectus mauris ultrices eros in cursus turpis. In vitae turpis massa sed elementum tempus egestas sed sed. Morbi enim nunc faucibus a pellentesque sit. Id aliquet lectus proin nibh. Consequat mauris nunc congue nisi vitae suscipit.

                            Velit egestas dui id ornare. Mollis nunc sed id semper. Ipsum dolor sit amet consectetur adipiscing. At consectetur lorem donec massa sapien faucibus et molestie ac. Condimentum vitae sapien pellentesque habitant morbi. Tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed. Fames ac turpis egestas sed tempus urna et pharetra pharetra. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Tincidunt praesent semper feugiat nibh sed pulvinar. Id velit ut tortor pretium viverra suspendisse potenti nullam ac. Ultrices vitae auctor eu augue ut lectus arcu. Blandit massa enim nec dui nunc. Nunc sed id semper risus in hendrerit gravida. Diam vel quam elementum pulvinar etiam non. Morbi tempus iaculis urna id volutpat lacus laoreet non. In ornare quam viverra orci sagittis eu. Bibendum est ultricies integer quis auctor. Etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Libero justo laoreet sit amet cursus sit amet dictum sit.
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export { Profile };
