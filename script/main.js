'use strict'

import { checkHit, createExplosion, drawAim, renderExpl, setAim, Spider, updateExpl, updateSpider } from "./func.js";


const gameStart = () => {
    let game = true;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 300;
    const grassImg = new Image();
    grassImg.src = '../images/grass.jpg';
    const explImg = new Image();
    explImg.src = '../images/expl.png'
    const aim = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        r: 2,
    }
    const spiders = [];
    const message = document.getElementById('message');
    const play = document.getElementById('play');
    for (let i = 0; i < 10; i++) {
        spiders.push(new Spider(
            Math.random() * (canvas.width - 70) - 40,
            Math.random() * (canvas.height - 50) - 80,
            150,
            150,
            i,
            0,
            '../images/spider.png',
            100 + i,
        ))
    }
    const expls = [];


    canvas.addEventListener('mousemove', (event) => setAim(aim, event));
    canvas.addEventListener('click', (e) => createExplosion(e, expls, 100, 100));
    canvas.addEventListener('click', (e) => checkHit(e, spiders));
    play.addEventListener('click', () => {
        message.style.display = 'none';
        gameStart();
        
    })
    anim();

    function anim() {
        if(game){
            render();
            update();
            requestAnimationFrame(anim);
        } else{
            message.style.display = 'block';
        }
    }
    

    function update() {
        for(let i = 0; i < spiders.length; i++){
            let spider = spiders[i];
            updateSpider(spider, 32, 8, 0.2);
            spider.timer--;
            if(spider.timer <= 0){
                spider.timer = 100 + i;
                spider.x = Math.random()  * (canvas.width - 70) - 40;
                spider.y = Math.random() * (canvas.height - 50) - 80;
            }
        }
        
        updateExpl(expls, 5, 4, 0.25);

        if(spiders.length == 0){
            setTimeout(() => game = false, 1200);
        }

    }
    function render() {
        ctx.drawImage(grassImg, 0, 0, canvas.width, canvas.height);
        for (const spider of spiders) {
            ctx.drawImage(spider.img, Math.floor(spider.animX) * 128, spider.animY * 128, 128, 128, spider.x, spider.y, spider.w, spider.h);
        }
        renderExpl(ctx, expls, explImg, 192, 192);
        drawAim(ctx, aim);
    }

} 

window.onload = gameStart;