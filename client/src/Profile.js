import React from 'react';
import './view/Profile.css'
import Logo from './Logo';
import avatar from "./image/woman.jpeg";
import anime from './image/anime.jpeg';
import AnimeDisplayed from "./AnimeDisplayedUnit";
export default function Profile() {
    return (
        <div className="body">
            <Logo />
            <div className="profile">
                <div className="profileAvatar">
                    <img src={avatar} />
                    <div className="profileName">Ac placerat</div>
                </div>
                <div className="profileInfo">
                    <div className="typeText">Recent Watched</div>
                    <div className="profileList">
                        <AnimeDisplayed animeImg={anime} name={"aaa"} />
                        <AnimeDisplayed animeImg={anime} name={"aaa"} />
                        <AnimeDisplayed animeImg={anime} name={"aaa"} />
                        <AnimeDisplayed animeImg={anime} name={"aaa"} />
                        <AnimeDisplayed animeImg={anime} name={"aaa"} />
                        <AnimeDisplayed animeImg={anime} name={"aaa"} />
                        <AnimeDisplayed animeImg={anime} name={"aaa"} />
                        <AnimeDisplayed animeImg={anime} name={"aaa"} />
                        <AnimeDisplayed animeImg={anime} name={"aaa"} />
                        <AnimeDisplayed animeImg={anime} name={"aaa"} />
                    </div>

                </div>
                <div className="profileInfo">
                    <div className="typeText">Recent Liked</div>
                    <div className="profileList">
                        <AnimeDisplayed animeImg={anime} name={"aaa"} />
                        <AnimeDisplayed animeImg={anime} name={"aaa"} />
                        <AnimeDisplayed animeImg={anime} name={"aaa"} />
                        <AnimeDisplayed animeImg={anime} name={"aaa"} />
                        <AnimeDisplayed animeImg={anime} name={"aaa"} />
                        <AnimeDisplayed animeImg={anime} name={"aaa"} />
                        <AnimeDisplayed animeImg={anime} name={"aaa"} />
                        <AnimeDisplayed animeImg={anime} name={"aaa"} />
                        <AnimeDisplayed animeImg={anime} name={"aaa"} />
                        <AnimeDisplayed animeImg={anime} name={"aaa"} />
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
