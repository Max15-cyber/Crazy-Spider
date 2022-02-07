'use strict'

function getCoords(event) {
    let x = event.pageX - event.target.getBoundingClientRect().x - document.documentElement.scrollLeft;
    let y = event.pageY - event.target.getBoundingClientRect().y - document.documentElement.scrollTop;
    return [x, y];
}



export function checkHit(e, spiders) {
    const [eX, eY] = getCoords(e);
    for (let i = 0; i < spiders.length; i++) {
        const spider = spiders[i];
        if (eX >= spider.x + 60
            && eX <= spider.x + (spider.w - 60)
            && eY >= spider.y + 60
            && eY <= spider.y + (spider.h - 40)) {
            spiders.splice(i, 1);

        }
    }

}

export function createExplosion(e, expls, w, h) {
    const [eX, eY] = getCoords(e);
    expls.push({
        x: eX - w / 2,
        y: eY - h / 2,
        w,
        h,
        animX: 0,
        animY: 0,
    })

}

export function renderExpl(ctx, expls, explImg, frameW, frameH) {
    for (const expl of expls) {
        ctx.drawImage(explImg, Math.floor(expl.animX) * frameW, expl.animY * frameH, frameW, frameH, expl.x, expl.y, expl.w, expl.h);
    }

}

export function updateExpl(expls, hor, vert, value = 1) {
    for (let i = 0; i < expls.length; i++) {
        const expl = expls[i];
        expl.animX += value;
        if (expl.animX >= hor) {
            expl.animX = 0;
            expl.animY++;
        }
        if (expl.animY >= vert) {
            expls.splice(i--, 1);
        }
    }
}

export function drawAim(ctx, aim) {
    ctx.save();
    ctx.fillStyle = ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(aim.x, aim.y, aim.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(aim.x - 20, aim.y);
    ctx.lineTo(aim.x - 7, aim.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(aim.x, aim.y - 20);
    ctx.lineTo(aim.x, aim.y - 7);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(aim.x, aim.y + 20);
    ctx.lineTo(aim.x, aim.y + 7);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(aim.x + 20, aim.y);
    ctx.lineTo(aim.x + 7, aim.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(aim.x, aim.y, aim.r + 25, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
}

export function setAim(aim, event) {
    [aim.x, aim.y] = getCoords(event);

}
export function updateSpider(spider, hor, vert, value = 1) {
    spider.animX += value;
    if (spider.animX >= hor) {
        spider.animY++;
        spider.animX = 0;
    }
    if (spider.animY >= vert) {
        spider.animY = 0;
    }
}
export class Spider {
    constructor(x, y, w, h, animX, animY, src, timer) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.animX = animX;
        this.animY = animY;
        this.img = new Image();
        this.img.src = src;
        this.timer = timer;
    }
}