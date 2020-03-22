module.exports =  {

    addToScore(user, amount) {
        user.score = user.score + (user.rank * 1000) + amount;
        user.rank = Math.floor(user.score / 1000);
        user.score = user.score - (user.rank * 1000);

        // Wenn Rank 0 ist, dann Punkte auf 0 setzen und Rank auf 1
        if (user.rank === 0) {
            user.rank = 1;
            user.score = 0;
        }

        user.save();
    }

};