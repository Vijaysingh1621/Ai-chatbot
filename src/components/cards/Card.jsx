import React from 'react'
import "./card.css"

const Card = () => {
  return (
    <div>
      <div className="grid">
        <div className="card no1">
          <span className="icon">
                          <svg version="1.1" viewBox="0 0 2048 2048" width="55px" height="55px" xmlns="http://www.w3.org/2000/svg">
                <path transform="translate(1401,80)" d="m0 0h19l34 2 33 4 36 7 33 9 32 11 28 12 28 14 21 12 27 18 11 8 13 10 11 9 10 9 8 7 15 14 15 16 12 14 13 16 13 18 10 15 13 21 15 28 12 26 10 26 4 9 24 16 16 12 10 9 8 7 17 17 9 11 14 18 11 18 9 16 10 21 7 18 8 28 4 20 3 26 1 23v992l-1 27-3 24-6 28-7 22-10 25-10 20-14 23-12 16-9 11-12 13-16 16-11 9-13 10-15 10-17 10-16 8-18 8-27 9-26 6-19 3-22 2h-1442l-22-2-24-4-23-6-21-7-17-7-19-10-16-9-16-11-13-10-10-9-8-7-17-17-18-22-14-21-12-21-11-24-11-33-6-27-3-23-1-13v-619l6-10 8-6 9-2v-26l-12-5-8-8-3-7v-46l3-7 7-8 8-4 5-2v-25l-11-4-7-6-4-7-1-2v-230l2-23 4-23 6-24 8-23 8-19 12-22 10-16 10-14 8-10 12-14 20-20 11-9 13-10 18-12 21-12 19-9 27-10 32-8 19-3 25-2h499l154-1 7-15 12-24 16-27 12-18 13-18 13-16 9-11 14-15 24-24 8-7 13-11 20-15 14-10 17-11 17-10 16-9 29-14 33-13 28-9 28-7 31-6 33-4 11-1z" fill="#F7F7F9"/>
                <path transform="translate(1401,80)" d="m0 0h19l34 2 33 4 36 7 33 9 32 11 28 12 28 14 21 12 27 18 11 8 13 10 11 9 10 9 8 7 15 14 15 16 12 14 13 16 13 18 10 15 13 21 15 28 12 26 10 26 4 9 24 16 16 12 10 9 8 7 17 17 9 11 14 18 11 18 9 16 10 21 7 18 8 28 4 20 3 26 1 23v992l-1 27-3 24-6 28-7 22-10 25-10 20-14 23-12 16-9 11-12 13-16 16-11 9-13 10-15 10-17 10-16 8-18 8-27 9-26 6-19 3-22 2h-1442l-22-2-24-4-23-6-21-7-17-7-19-10-16-9-16-11-13-10-10-9-8-7-17-17-18-22-14-21-12-21-11-24-11-33-6-27-3-23-1-13v-619l6-10 8-6 9-2v-2l6 2 8 4 7 7 4 9 1 47 1 440-1 85v36l2 28 5 26 6 20 8 21 10 20 14 22 13 17 12 13 13 13 11 9 13 10 21 13 22 11 21 8 25 7 24 4 12 1h1443l25-3 20-4 24-7 20-8 23-12 21-14 16-13 10-9 12-12 9-11 10-13 13-21 8-16 8-18 7-21 5-22 3-21 1-26v-996l-2-29-4-22-7-25-10-25-11-21-11-17-12-16-12-13-13-13v9l3 23 2 26v47l-3 36-5 32-8 36-10 33-10 26-9 21-9 19-13 23-14 23-12 17-13 17-11 13-9 11-10 10-2 3h-2l-2 4-8 8-8 7-14 13-8 7-11 11-12 16-10 18-6 15-6 21-3 29-3 11-7 8-7 4-6 1h-485l-10-4-7-7-4-13-2-23-4-19-7-19-11-21-9-12-11-12-11-11-8-7-12-11-24-24-7-8-12-14-11-14-13-18-16-25-15-27-13-27-11-27-12-36-9-36-6-35-4-42v-46l3-35 6-38 7-31 5-17 1-4-635 1-21 2-17 3-23 6-24 9-16 8-16 9-16 11-14 11-13 12-11 11-9 11-13 17-14 24-9 19-9 25-6 24-3 21-1 16-1 223-5 10-7 7-6 3-7 1-11-4-7-6-4-7-1-2v-230l2-23 4-23 6-24 8-23 8-19 12-22 10-16 10-14 8-10 12-14 20-20 11-9 13-10 18-12 21-12 19-9 27-10 32-8 19-3 25-2h499l154-1 7-15 12-24 16-27 12-18 13-18 13-16 9-11 14-15 24-24 8-7 13-11 20-15 14-10 17-11 17-10 16-9 29-14 33-13 28-9 28-7 31-6 33-4 11-1z" fill="#F9D36A"/>
                <path transform="translate(1401,80)" d="m0 0h19l34 2 33 4 36 7 33 9 32 11 28 12 28 14 21 12 27 18 11 8 13 10 11 9 10 9 8 7 15 14 15 16 12 14 13 16 13 18 10 15 13 21 15 28 12 26 10 26 4 9 24 16 16 12 10 9 8 7 17 17 9 11 14 18 11 18 9 16 10 21 7 18 8 28 4 20 3 26 1 23v992l-1 27-3 24-6 28-7 22-10 25-10 20-14 23-12 16-9 11-12 13-16 16-11 9-13 10-15 10-17 10-16 8-18 8-27 9-26 6-19 3-22 2h-1442l-22-2-24-4-23-6-21-7-17-7-19-10-16-9-16-11-13-10-10-9-8-7-17-17-18-22-14-21-12-21-11-24-11-33-6-27-3-23-1-13v-619l6-10 8-6 9-2v-2l6 2 8 4 7 7 4 9 1 47 1 440-1 85v36l2 28 5 26 6 20 8 21 10 20 14 22 13 17 12 13 13 13 11 9 13 10 21 13 22 11 21 8 25 7 24 4 12 1h1443l25-3 20-4 24-7 20-8 23-12 21-14 16-13 10-9 12-12 9-11 10-13 13-21 8-16 8-18 7-21 5-22 3-21 1-26v-996l-2-29-4-22-7-25-10-25-11-21-11-17-12-16-12-13-13-13v9l3 23 2 26v47l-3 36-5 32-8 36-10 33-10 26-9 21-9 19-13 23-14 23-12 17-13 17-11 13-9 11-10 10-2 3h-2l-2 4-8 8-8 7-14 13-8 7-11 11-12 16-10 18-6 15-6 21-3 29-3 11-7 8-7 4-6 1h-485l-10-4-7-7-4-13-2-23-4-19-7-19-11-21-9-12-11-12-11-11-8-7-12-11-24-24-7-8-12-14-11-14-13-18-16-25-15-27-13-27-11-27-12-36-9-36-6-35-4-42v-46l3-35 6-38 7-31 5-17 1-4-635 1-21 2-17 3-23 6-24 9-16 8-16 9-16 11-14 11-13 12-11 11-9 11-13 17-14 24-9 19-9 25-6 24-3 21-1 16-1 223-5 10-7 7-6 3-7 1-11-4-7-6-4-7-1-2v-230l2-23 4-23 6-24 8-23 8-19 12-22 10-16 10-14 8-10 12-14 20-20 11-9 13-10 18-12 21-12 19-9 27-10 32-8 19-3 25-2h499l154-1 7-15 12-24 16-27 12-18 13-18 13-16 9-11 14-15 24-24 8-7 13-11 20-15 14-10 17-11 17-10 16-9 29-14 33-13 28-9 28-7 31-6 33-4 11-1zm-19 49-38 4-31 6-27 7-27 9-22 9-24 11-26 14-19 12-20 14-14 11-11 9-10 9-8 7-22 22-7 8-12 14-15 20-16 24-13 22-8 15-10 22-11 29-9 29-7 30-3 15-4 30-1 24v35l2 30 5 34 7 31 7 24 10 28 11 25 11 22 14 24 10 15 10 14 11 14 12 14 9 10 12 13 8 7 14 13 8 7 13 12 9 11 12 16 9 16 9 19 6 17 5 20 2 12 1 1h425l7-1 5-24 6-20 8-18 9-17 10-14 8-10 9-10 13-13 11-9 10-10 8-7 9-9 7-8 13-15 14-18 15-22 8-13 12-21 12-24 13-32 9-27 8-31 6-35 3-27v-62l-3-27-4-25-6-28-10-35-8-22-10-23-10-20-14-24-12-18-10-14-11-14-12-14-14-15-18-18-8-7-13-11-17-13-17-12-23-14-18-10-27-13-28-11-31-10-30-7-23-4-25-3-13-1z" fill="#010000"/>
                <path transform="translate(186,586)" d="m0 0h28l22 3 23 6 21 9 18 10 16 12 13 12 9 9 10 13 11 18 8 16 7 20 5 22 2 23-1 25-4 22-5 16-5 13-8 16-8 13-9 12-15 16-10 9-17 12-16 9-15 7-15 5-22 5-19 2h-22l-10-2-14-7-9-9-7-14-2-14v-265l2-12 6-12 9-10 9-6 8-3z" fill="#010000"/>
                <path transform="translate(531,586)" d="m0 0h29l21 3 17 4 19 7 16 8 15 9 14 11 13 12 10 11 12 17 10 18 8 19 6 22 3 20v34l-4 23-5 17-6 16-10 19-12 17-10 11-6 7-8 7-17 13-19 11-18 8-20 6-22 4-10 1h-24l-12-3-8-4-9-7-7-10-4-10-1-6v-275l3-12 6-10 5-6 10-7 10-4z" fill="#010000"/>
                <path transform="translate(1225,1093)" d="m0 0h368l14 3 14 7 12 11 7 11 5 12 2 13-1 15-5 15-7 11-7 8-10 7-10 5-12 3h-370l-12-3-14-7-10-9-6-7-8-16-2-9v-19l3-12 6-12 9-10 9-8 14-7z" fill="#010000"/>
                <path transform="translate(1023,1403)" d="m0 0 11 1 8 5 6 7 3 10 18 137 10 76 2 15 1 2 13-29 17-39 14-32 6-9 8-7 11-4h11l11 4 8 6 6 9 11 24 17 39 16 36 3 3-1-4 9-68 10-76 10-74 2-13 5-10 7-6 8-3 11 1 10 6 6 10 1 8-8 63-13 97-15 114-5 34-4 10-7 7-8 4-3 1h-12l-10-4-8-7-8-16-13-30-18-41-19-43-3-8h-2l-13 30-17 39-15 34-13 30-7 9-10 6-4 1h-11l-10-4-8-7-4-7-3-15-18-136-19-143-2-20 2-8 4-6 8-7z" fill="#010000"/>
                <path transform="translate(1280,1220)" d="m0 0h187l100 1 9 2 11 6 8 7 6 10 4 11v17l-3 10-7 11-10 10-11 9-16 12-18 11-17 9-24 10-15 5-26 6-20 3-11 1h-36l-31-4-28-7-22-8-22-10-22-13-14-10-14-11-12-11-7-10-4-10-1-4v-14l3-10 6-11 9-9 11-6 8-2z" fill="#010000"/>
                <path transform="translate(416,1399)" d="m0 0h11l10 4 8 7 7 10 13 23 14 24 45 78 11 19 15 26 14 24 15 26 5 8 1-230 4-9 9-8 6-2h10l10 5 6 7 3 9v305l-2 11-6 9-8 6-6 2h-12l-10-4-7-7-12-20-16-28-15-26-14-24-30-52-14-24-16-28-14-24-10-17v-2h-2l1 15-1 223-5 10-7 6-8 3-11-1-8-4-6-7-3-9v-309l4-10 9-10 8-4z" fill="#010000"/>
                <path transform="translate(496,1043)" d="m0 0h23l16 3 15 6 16 9 14 12 11 12 10 15 9 19 6 20 3 17v32l-5 25-5 15-11 21-8 11-9 10-7 7-14 10-19 9-15 4-19 2-18-2-15-4-16-8-11-7-12-11-7-7-11-15-9-17-8-24-3-17-1-10v-17l3-20 4-16 6-16 9-16 8-11 9-10 7-7 14-10 16-8 12-4z" fill="#F7F7F9"/>
                <path transform="translate(809,1447)" d="m0 0h17l17 3 12 4 17 9 13 10 13 13 10 14 10 19 6 17 4 20 1 9v23l-3 21-6 20-9 19-8 12-9 11-11 11-18 12-11 5-17 5-12 2h-16l-20-4-17-7-14-9-13-11-10-11-7-10-9-16-7-19-4-16-2-14v-24l3-20 5-17 6-15 6-11 10-14 9-10 7-7 16-11 14-7 13-4z" fill="#F7F7F9"/>
                <path transform="translate(806,1399)" d="m0 0h25l23 4 18 6 16 8 12 7 13 10 12 11 11 12 11 15 9 16 8 17 7 22 4 20 2 18v24l-2 17-5 24-7 20-11 23-8 12-10 13-13 14-11 9-14 10-18 10-19 7-17 4-19 2h-10l-20-2-17-4-16-6-16-8-14-9-13-11-11-10-9-11-10-14-10-18-8-19-6-21-4-22-1-12v-19l1-16 5-25 8-24 8-17 10-16 8-11 13-15 11-10 15-11 16-9 16-7 17-5zm3 48-18 3-14 5-14 8-13 10-12 12-10 14-8 14-7 17-5 20-2 15v24l3 18 4 15 6 16 10 18 13 16 7 7 13 10 12 7 15 6 20 4h16l20-4 16-6 12-7 12-9 12-12 11-15 10-19 7-21 3-17 1-8v-23l-3-20-4-15-6-15-8-15-8-11-9-10-8-8-14-10-19-9-16-4-8-1z" fill="#010000"/>
                <path transform="translate(493,995)" d="m0 0h30l22 4 18 6 16 8 16 10 13 11 17 17 11 15 10 17 7 15 8 24 5 24 1 11v31l-3 22-4 17-8 22-8 16-9 15-8 10-7 9h-2l-2 4-12 11-13 10-16 9-15 7-19 6-17 3h-33l-20-4-18-6-17-8-12-8-13-10-10-9-8-8-10-13-9-14-8-15-9-23-6-24-2-15-1-14v-12l3-29 6-24 8-20 8-16 10-16 11-13 11-12 11-9 15-11 17-9 19-7 18-4zm3 48-15 3-14 5-16 9-13 11-10 10-10 14-6 10-7 16-5 16-3 17-1 9v17l3 22 6 21 7 16 9 15 11 13 11 11 13 9 16 8 12 4 11 2 13 1 18-2 15-4 19-9 11-8 10-9 7-7 10-14 11-21 6-18 4-22v-32l-5-25-7-19-9-17-9-12-11-12-12-10-16-9-15-6-16-3z" fill="#010000"/>
                <path transform="translate(167,1403)" d="m0 0 10 1 8 4 7 8 2 5v134l6-5 7-8 11-12 7-8 11-12 7-8 11-12 9-11 9-9 7-8 9-10 9-11 7-7 7-8 5-6 9-7 5-2h13l9 5 6 8 2 5v11l-5 10-12 13-7 8-12 13-9 10-12 14-15 16-7 8-12 14-16 17-7 8-6 7 1 5 14 15 7 8 10 11 7 8 11 12 7 8 11 12 7 8 11 12 7 8 10 11 7 8 9 10 6 10 1 4v7l-3 8-5 7-10 5-8 1-9-3-6-4-8-8-7-8-9-10-7-8-9-10-7-8-11-12-18-20-7-8-11-12-7-8-10-11-7-9-4 2-8 10-1 110-4 9-4 5-10 5h-10l-10-4-7-8-2-5-1-6v-311l3-9 4-5 7-5z" fill="#010000"/>
                <path transform="translate(716,995)" d="m0 0h13l8 4 6 7 3 6v224l1 17 4 13 7 12 8 9 11 7 12 5 5 1h20l13-4 10-5 10-9 7-9 5-11 3-14 1-234 3-8 9-9 5-2h13l8 4 7 8 3 7v236l-3 19-6 18-6 11-10 14-13 13-16 11-15 7-17 5-6 1h-30l-17-4-17-7-14-9-11-9-11-12-10-16-7-17-3-12-2-23v-206l1-16 2-9 6-8 5-4z" fill="#010000"/>
                <path transform="translate(195,634)" d="m0 0h14l21 3 17 5 16 7 14 9 10 8 14 14 10 14 10 19 6 18 3 15 1 8v19l-4 23-6 18-10 19-9 12-9 10-8 8-17 12-19 9-16 5-16 3-8 1h-14l-1-2v-256z" fill="#F7F7F9"/>
                <path transform="translate(541,634)" d="m0 0h13l17 2 17 4 16 7 16 9 10 8 12 11 10 12 10 16 7 16 4 13 3 17v28l-2 14-6 20-8 16-9 14-9 11-9 9-13 10-18 10-15 6-17 4-16 2h-13l-1-1v-257z" fill="#F7F7F9"/>
                <path transform="translate(1507,1371)" d="m0 0h26l21 4 16 6 19 10 14 11 14 14 11 16 8 16 5 14 4 18 1 11v13l-3 21-5 17-8 17-7 11-8 10-15 15-16 11-15 8-1 50-2 10-6 9-6 4-6 2h-8l-8-3-7-5-4-7-2-15v-17l1-51 5-10 7-6 19-7 14-8 10-8 10-13 7-14 4-15 1-8v-12l-3-15-5-13-9-14-7-8-14-10-12-6-12-3-7-1h-17l-15 3-14 6-13 9-8 8-9 14-6 14-4 11-6 7-8 4-10 1-9-3-8-7-4-11v-7l4-15 10-21 11-16 12-13 14-11 13-8 13-6 16-5z" fill="#010000"/>
                <path transform="translate(164,995)" d="m0 0h12l10 5 7 9 9 15 19 32 17 28 12 20 3-3 27-45 17-28 13-22 6-7 9-4h12l8 4 7 8 3 8-1 11-6 12-45 75-17 28-10 17-1 5v163l-2 9-4 6-7 6-5 2h-13l-8-4-7-8-2-5-1-172-6-11-17-28-17-29-33-55-6-12-1-9 3-9 7-8z" fill="#010000"/>
                <path transform="translate(412,586)" d="m0 0h11l10 5 6 8 2 5v318l-3 8-7 7-10 4h-7l-9-3-7-6-4-8-1-6v-304l1-11 4-8 7-6z" fill="#010000"/>
                <path transform="translate(1544,1268)" d="m0 0h7v3l-17 13-19 12-16 8-20 8-18 5-20 4-17 2h-29l-24-3-21-5-18-6-16-7-17-9-12-8-16-12-4-4z" fill="#D2DEE5"/>
                <path transform="translate(1228,1141)" d="m0 0h362l5 3 4 7-1 7-4 6-4 2h-361l-6-5-3-9 4-8z" fill="#D2DEE5"/>
                <path transform="translate(43,934)" d="m0 0 10 3 8 6 6 10 1 3v42l-4 10-7 8-12 5-10-3-6-4-7-8-2-5v-46l3-7 7-8 8-4z" fill="#010000"/>
                <path transform="translate(1540,1709)" d="m0 0h8l10 4 7 8 3 7v11l-5 10-8 7-6 2h-10l-9-4-5-5-4-8-1-3v-9l4-10 8-7z" fill="#010000"/>
                <path transform="translate(1270,1161)" d="m0 0h262v1l19 1v1l8 1v1h-297v-1h-7l-2-2 17-1z" fill="#F8F8FA"/>
                <path transform="translate(1364,1141)" d="m0 0h173v1l-56 1-5 1v1l-29 2h-44l-22-1-10-2-15-1v-1z" fill="#F8F8FA"/>
                <path transform="translate(1267,1269)" d="m0 0h5v2l10-1 5 2 3 1 8-1 2 4h-2v3h-2l4 4v2l-2 1 6 4 15 8 12 6 10 4 9 4h3v2h8v2l4 1-4 1-21-6-20-8-21-11-12-8-16-12z" fill="#F6F7F9"/>
                <path transform="translate(1536,1270)" d="m0 0h6l5 1-1 4-15 11-18 11-16 8-18 7-5 1-1-2 6-2 1-2h5l5-2 1-2h4v-2l6-2v-2l5-2v-4l10-5 3-3 8-5 2-3h2l1-3 1 1 3-1z" fill="#F6F7F9"/>
                <path transform="translate(1129,1915)" d="m0 0h21l1 1 10 1 197 1v1h-211l-50-1v-1h32z" fill="#D2DEE5"/>
                <path transform="translate(1576,1141)" d="m0 0h14l5 3 4 7-1 7-4 6-4 2h-10l1-2 7-1 2-5 1-2-2-6-4-1-1-3h2l1-3-11-1z" fill="#F5F6F8"/>
                <path transform="translate(1228,1144)" d="m0 0h14l1 2-11 2-3 2 1 8 5 1v2h3v4l-9 1-6-5-3-9 3-6z" fill="#F6F7F9"/>
                <path transform="translate(1343,1310)" d="m0 0 10 2v2h8v2l4 1-4 1-18-5z" fill="#F4F5F7"/>
                <path transform="translate(1270,1161)" d="m0 0h14l-1 3-28 1-2-2 17-1z" fill="#F5F6F8"/>
                <path transform="translate(1486,1306)" d="m0 0h2l-1 3-13 4-1-2 6-2 1-2h5z" fill="#F0F2F5"/>
                <path transform="translate(1544,1268)" d="m0 0h7v3l-4 2-5-2v-2z" fill="#DEE6EC"/>
                <path transform="translate(1228,1141)" d="m0 0 4 1 5 1v1l-13 2 1-3z" fill="#D7E2E8"/>
                </svg>
          </span>
          <h4>Fun Fact</h4>
          <p>
          Fun fact about the animals
          </p>
          <div className="shine"></div>
          <div className="background">
            <div className="tiles">
              <div className="tile tile-1"></div>
              <div className="tile tile-2"></div>
              <div className="tile tile-3"></div>
              <div className="tile tile-4"></div>

              <div className="tile tile-5"></div>
              <div className="tile tile-6"></div>
              <div className="tile tile-7"></div>
              <div className="tile tile-8"></div>

              <div className="tile tile-9"></div>
              <div className="tile tile-10"></div>
            </div>

            <div className="line line-1"></div>
            <div className="line line-2"></div>
            <div className="line line-3"></div>
          </div>
        </div>
        <div className="card">
          <span className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 256 256" viewBox="0 0 256 256" id="graduation-hat"><path fill="#fcd224" d="M229.1,155.3c-1.6,0-2.9-1.3-2.9-2.9v-44.6c0-1.6,1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9v44.6
                    C232.1,154,230.7,155.3,229.1,155.3z"></path><path fill="#454a4f" d="M49.9,110.2v51.8c0,14.3,35,26,78.1,26s78.1-11.6,78.1-26v-51.8H49.9z"></path><path fill="#5d6168" d="M242,109.9l-105,32.3c-5.9,1.8-12.1,1.8-18,0L14,109.9c-4-1.2-4-6.9,0-8.1l105-32.3c5.9-1.8,12.1-1.8,18,0
                    l105,32.3C246,103,246,108.7,242,109.9z"></path><path fill="#ffe471" d="M238.6,158.6c0,7.4-4.3,17.3-9.5,17.3c-5.3,0-9.5-9.9-9.5-17.3s4.3-9.5,9.5-9.5
                    C234.4,149,238.6,151.2,238.6,158.6z"></path></svg>

          </span>
          <h4>Study</h4>
          <p>
            Explain what is Semiconductors
          </p>
          <div className="shine"></div>
          <div className="background">
            <div className="tiles">
              <div className="tile tile-1"></div>
              <div className="tile tile-2"></div>
              <div className="tile tile-3"></div>
              <div className="tile tile-4"></div>

              <div className="tile tile-5"></div>
              <div className="tile tile-6"></div>
              <div className="tile tile-7"></div>
              <div className="tile tile-8"></div>

              <div className="tile tile-9"></div>
              <div className="tile tile-10"></div>
            </div>

            <div className="line line-1"></div>
            <div className="line line-2"></div>
            <div className="line line-3"></div>
          </div>
        </div>
        <div className="card no_3">
          <span className="icon">
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 40 40" width="16px" height="16px"><path fill="#ffeea3" d="M14.5,29.833V28c0-1.914-1.168-3.76-2.52-5.897C10.349,19.525,8.5,16.603,8.5,13 C8.5,6.659,13.659,1.5,20,1.5S31.5,6.659,31.5,13c0,3.603-1.849,6.525-3.48,9.103C26.668,24.24,25.5,26.086,25.5,28v1.833H14.5z"/><path fill="#ba9b48" d="M20,2c6.065,0,11,4.935,11,11c0,3.458-1.808,6.315-3.402,8.835C26.262,23.947,25,25.941,25,28v1.333 h-5h-5V28c0-2.059-1.262-4.053-2.598-6.165C10.808,19.315,9,16.458,9,13C9,6.935,13.935,2,20,2 M20,1C13.373,1,8,6.373,8,13 c0,6.667,6,10.958,6,15v2.333h6h6V28c0-4.042,6-8.333,6-15C32,6.373,26.627,1,20,1L20,1z"/><path fill="#fff" d="M22.714,11.335c0.502,0,0.974,0.195,1.329,0.55c0.733,0.733,0.733,1.925,0,2.657l-1.75,1.75 L22,16.586V17v12h-4V17v-0.414l-0.293-0.293l-1.75-1.75c-0.733-0.733-0.733-1.925,0-2.657c0.355-0.355,0.827-0.55,1.329-0.55 c0.502,0,0.974,0.195,1.329,0.55l0.679,0.679L20,13.271l0.707-0.707l0.679-0.679C21.741,11.531,22.212,11.335,22.714,11.335 M22.714,10.335c-0.737,0-1.474,0.281-2.036,0.843L20,11.857l-0.679-0.679c-0.562-0.562-1.299-0.843-2.036-0.843 c-0.737,0-1.474,0.281-2.036,0.843c-1.124,1.124-1.124,2.947,0,4.071L17,17v13h6V17l1.75-1.75c1.124-1.124,1.124-2.947,0-4.071 C24.188,10.616,23.451,10.335,22.714,10.335L22.714,10.335z"/><path fill="#8b75a1" d="M20 31A4 4 0 1 0 20 39A4 4 0 1 0 20 31Z"/><path fill="#dcd5f2" d="M17,36.5c-1.378,0-2.5-1.122-2.5-2.5v-5.5h11V34c0,1.378-1.122,2.5-2.5,2.5H17z"/><path fill="#8b75a1" d="M25,29v5c0,1.103-0.897,2-2,2h-6c-1.103,0-2-0.897-2-2v-5H25 M26,28H14v6c0,1.657,1.343,3,3,3h6 c1.657,0,3-1.343,3-3V28L26,28z"/><path fill="#8b75a1" d="M19 34H25.488V35H19zM14.56 34H17V35H14.56zM19 32H26V33H19zM14 32H17V33H14zM19 30H26V31H19zM14 30H17V31H14z"/></svg>
          </span>
          <h4>Innovation</h4>
          <p>
           Explain what is Semiconductors
          </p>
          <div className="shine"></div>
          <div className="background">
            <div className="tiles">
              <div className="tile tile-1"></div>
              <div className="tile tile-2"></div>
              <div className="tile tile-3"></div>
              <div className="tile tile-4"></div>

              <div className="tile tile-5"></div>
              <div className="tile tile-6"></div>
              <div className="tile tile-7"></div>
              <div className="tile tile-8"></div>

              <div className="tile tile-9"></div>
              <div className="tile tile-10"></div>
            </div>

            <div className="line line-1"></div>
            <div className="line line-2"></div>
            <div className="line line-3"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
