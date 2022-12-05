document.addEventListener("DOMContentLoaded", () => {
    setTimeout(incrementTimer, 1000);
    document.getElementById('minus').addEventListener("click", minusButton);
    document.getElementById('plus').addEventListener("click", plusButton);
    document.getElementById('heart').addEventListener("click", likeNumber);
    document.getElementById('pause').addEventListener("click", pause);
    document.getElementById('comment-form').addEventListener("submit", submitComment);
});

let timer = Number(document.getElementById('counter').textContent);
let paused = false;
const likedTimes = {}; // this object will store the liked times. each key will be a time, and the value will be the number of likes that time has

function submitComment (event) {
    event.preventDefault();
    comment = document.createElement('p');
    comment.textContent = event.target.children[0].value;
    document.getElementById('list').appendChild(comment);
}

function pause() {
    if (paused) {
        document.getElementById('minus').disabled = false;
        document.getElementById('plus').disabled = false;
        document.getElementById('heart').disabled = false;
        document.getElementById('pause').textContent = ('pause');
        setTimeout(incrementTimer, 1000);
        paused = false;
    }

    else {
        document.getElementById('minus').disabled = true;
        document.getElementById('plus').disabled = true;
        document.getElementById('heart').disabled = true;
        document.getElementById('pause').textContent = ('resume');
        paused = true;
    }
}

function incrementTimer() {
    if (!paused) {
        timer++;
        document.getElementById('counter').textContent = `\n    ${timer}\n  `;
        setTimeout(incrementTimer, 1000);    
    }
}

function minusButton() {
    timer--;
    document.getElementById('counter').textContent = `\n    ${timer}\n  `;
}

function plusButton() {
    timer++;
    document.getElementById('counter').textContent = `\n    ${timer}\n  `;
}

function likeNumber() {
    let likesUl = document.getElementsByClassName('likes')[0]; // this is the unordered list
    let newTime = true;

    for (const time in likedTimes) {
        if (Number(time) === timer) {
            likedTimes[time]++;
            newTime = false;
            break;
        }
    }

    if (newTime) {
        likedTimes[timer] = 1;
        console.log(likedTimes);
    }

    while (likesUl.firstChild) {
        likesUl.removeChild(likesUl.firstChild);
    }

    for (const time in likedTimes) {
        let line = document.createElement('li');
        if (Number(likedTimes[time]) === 1) {
            line.textContent = `${time} has been liked ${likedTimes[time]} time`
        }

        else {
            line.textContent = `${time} has been liked ${likedTimes[time]} times`
        }
        likesUl.appendChild(line);
    }
}