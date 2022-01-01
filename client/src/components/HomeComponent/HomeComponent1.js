import React from "react";
import "./Home.css";
import { Link } from 'react-router-dom';
// import HomeComponent1 from "./HomeComponent1";

function HomeComponent() {
    return (
        <div className="first">
            <div className="homeFirst">

            <div className="homeInside homeInside2">
                    <div className="homeInsideRightContent">
                        <div className="homeInsideCard">

                <div className="homeInside homeInside1">
                    <div className="homeInsideLeftContent">
                        <div className="LeftContent LeftContent1">MetaMask 방문을 환영합니다</div>
                        <div className="LeftContent LeftContent2"><p>이더리움 및 분산형 웹에 연결합니다.</p></div>
                        <div className="LeftContent LeftContent3">

                            <div className="LeftContent3-1">시작하기</div>

                            <Link to="/create" className="LeftContent3-2">
                             Create
                             </Link>

                        </div>

                        <div className="LeftContent LeftContent4">
                            <div>
                                <i class="fas fa-play-circle"></i>
                            </div>
                            <div className="LeftContent4-2">  </div>
                        </div>
                    </div>
                </div>
                {/* <div className="homeInside homeInside2">
                    <div className="homeInsideRightContent">
                        <div className="homeInsideCard"> */}
                            {/* <article className="content">
                                <img
                                    className="image"
                                    // src="https://lh3.googleusercontent.com/qFqqt3LaXgR2wvJxAT0mdGwFbm0s2YqsW29f9orezXSNFSJosGtLgWsUw1Tn-t_8MHqZ52OTGaFI_7wENBpVHwilTnj7iiegcw4lKA=s550"
                                />
                            </article>
                            <footer className="content2">
                                <div className="nameCard">
                                    <img
                                        className="boy"
                                        // src="https://lh3.googleusercontent.com/JbvWs8J7RjXjq_ois27TEU9L_Z5L_24XZ20uaJJdY2NxIr-K1W9pe-GCU3FQBH6oGpfoOdpoNkPc2gMiUvdFdmwUxeMlKCUJO--k=s80"
                                    />
                                </div>
                                <div className="nameCardCenter">
                                    <div className="nameCardCenterContent1">  </div>
                                    <div className="nameCardCenterContent2">  </div>
                                </div>
                                <div className="nameCard">
                                    <i class="fas fa-info-circle"></i>
                                </div>
                            </footer> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeComponent;
