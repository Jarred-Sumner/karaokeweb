"use strict";

const RAW_SONGS = [
  {
    name: "Call Me Maybe",
    artist: "Carley Rae Jepson",
    lyrics: [
      { body: "I threw a wish in the well", start_offset: 6.5 },
      { body: "Don′t ask me I will never tell", start_offset: 56.0 },
      { body: "I looked at you as it fell", start_offset: 108.0 },
      { body: "And now You are in my way", start_offset: 10.111 },
      { body: "I trade my soul for a wish", start_offset: 15.125 },
      { body: "Pennies and dimes for a kiss", start_offset: 23.091 },
      { body: "I wasn′t looking for this", start_offset: 25.091 },
      { body: "But now You are in my way", start_offset: 26.333 },
      { body: "Your stare was holding", start_offset: 23.226 },
      { body: "Ripped jeans", start_offset: 22.099 },
      { body: "Skin was showing", start_offset: 23.235 },
      { body: "Hot night", start_offset: 0 },
      { body: "Wind was blowing", start_offset: 25.235 },
      { body: "Where you think You are going baby?", start_offset: 26.099 },
      { body: "Hey I just met you", start_offset: 29.667 },
      { body: "And this is crazy", start_offset: 31.25 },
      { body: "But here′s my number", start_offset: 33.389 },
      { body: "So call me maybe", start_offset: 35.235 },
      { body: "It is hard to look right at you baby", start_offset: 39.226 },
      { body: "But here′s my number", start_offset: 41.235 },
      { body: "So call me maybe", start_offset: 43.429 },
      { body: "Hey I just met you", start_offset: 45.429 },
      { body: "And this is crazy", start_offset: 47.667 },
      { body: "But here′s my number", start_offset: 49.639 },
      { body: "So call me maybe", start_offset: 51.408 },
      { body: "And all the other boys", start_offset: 53.408 },
      { body: "Try to chase me", start_offset: 55.235 },
      { body: "But here′s my number", start_offset: 57.429 },
      { body: "So call me maybe", start_offset: 59.22 },
      { body: "You took your time with the call", start_offset: 12.333 },
      { body: "I took no time with the fall", start_offset: 15.091 },
      { body: "You gave me nothing at all", start_offset: 0 },
      { body: "But still You are in my way", start_offset: 20.0 },
      { body: "I beg and borrow and steal", start_offset: 16.762 },
      { body: "At first sight and It is real", start_offset: 24.0 },
      { body: "I didn′t know I would feel it", start_offset: 26.0 },
      { body: "But It is in my way", start_offset: 19.923 },
      { body: "Your stare was holding", start_offset: 23.226 },
      { body: "Ripped jeans", start_offset: 22.099 },
      { body: "Skin was showing", start_offset: 23.25 },
      { body: "Hot night", start_offset: 24.099 },
      { body: "Wind was blowing", start_offset: 25.235 },
      { body: "Where you think You are going baby?", start_offset: 35.091 },
      { body: "Hey I just met you", start_offset: 30.439 },
      { body: "And this is crazy", start_offset: 31.389 },
      { body: "But here′s my number", start_offset: 33.389 },
      { body: "So call me maybe", start_offset: 35.429 },
      { body: "It is hard to look right at you baby", start_offset: 37.667 },
      { body: "But here′s my number", start_offset: 41.408 },
      { body: "So call me maybe", start_offset: 43.25 },
      { body: "Hey I just met you", start_offset: 46.381 },
      { body: "And this is crazy", start_offset: 47.408 },
      { body: "But here′s my number", start_offset: 49.667 },
      { body: "So call me maybe", start_offset: 51.429 },
      { body: "And all the other boys", start_offset: 53.429 },
      { body: "Try to chase me", start_offset: 55.429 },
      { body: "But here′s my number", start_offset: 57.639 },
      { body: "So call me maybe", start_offset: 59.408 },
      { body: "Before you came into my life", start_offset: 1.235 },
      { body: "I missed you so bad", start_offset: 3.408 },
      { body: "I missed you so bad", start_offset: 54.0 },
      { body: "I missed you so so bad", start_offset: 9.226 },
      { body: "Before you came into my life", start_offset: 11.125 },
      { body: "I missed you so bad", start_offset: 60.0 },
      { body: "And you should know that", start_offset: 14.5 },
      { body: "It is hard to look right at you baby", start_offset: 25.429 },
      { body: "But here′s my number", start_offset: 29.25 },
      { body: "So call me maybe", start_offset: 31.235 },
      { body: "Hey I just met you", start_offset: 33.639 },
      { body: "And this is crazy", start_offset: 35.667 },
      { body: "But here′s my number", start_offset: 37.667 },
      { body: "So call me maybe", start_offset: 39.429 },
      { body: "And all the other boys", start_offset: 41.923 },
      { body: "Try to chase me", start_offset: 43.639 },
      { body: "But here′s my number", start_offset: 45.923 },
      { body: "So call me maybe", start_offset: 47.639 },
      { body: "Before you came into my life", start_offset: 49.639 },
      { body: "I missed you so bad", start_offset: 51.389 },
      { body: "I missed you so bad", start_offset: 61.091 },
      { body: "I missed you so so bad", start_offset: 58.762 },
      { body: "Before you came into my life", start_offset: 59.226 },
      { body: "I missed you so bad", start_offset: 59.639 },
      { body: "And you should know that", start_offset: 9.091 },
      { body: "So call me‚ maybe", start_offset: 3.923 }
    ]
  },
  {
    name: "September",
    artist: "Earth, Wind, and Fire",
    lyrics: [
      {
        body: "Do you remember the 21st night of September?",
        start_offset: 20.667
      },
      {
        body: "Love was changing the minds of pretenders",
        start_offset: 26.235
      },
      { body: "While chasing the clouds away", start_offset: 30.639 },
      { body: "Our hearts were ringing", start_offset: 0 },
      { body: "In the key that our souls were singing", start_offset: 46.091 },
      { body: "As we danced in the night", start_offset: 141.0 },
      {
        body: "Remember how the stars stole the night away",
        start_offset: 46.333
      },
      { body: "Ba de ya‚ say do you remember", start_offset: 151.0 },
      { body: "Ba de ya‚ dancing in September", start_offset: 55.111 },
      { body: "Ba de ya‚ never was a cloudy day", start_offset: 59.429 },
      { body: "Ba de ya de ya de ya", start_offset: 8.439 },
      { body: "Ba de ya de ya de ya", start_offset: 19.091 },
      { body: "Ba de ya de ya de ya de ya", start_offset: 114.0 },
      { body: "My thoughts are with you", start_offset: 21.111 },
      { body: "Holding hands with your heart to see you", start_offset: 123.0 },
      { body: "Only blue talk and love", start_offset: 27.099 },
      {
        body: "Remember how we knew love was here to stay",
        start_offset: 29.099
      },
      {
        body: "Now December found the love that we shared in September",
        start_offset: 38.0
      },
      { body: "Only blue talk and love", start_offset: 52.0 },
      { body: "Remember the true love we share today", start_offset: 44.111 },
      { body: "Ba de ya‚ say do you remember", start_offset: 54.381 },
      { body: "Ba de ya‚ dancing in September", start_offset: 56.099 },
      { body: "Ba de ya‚ never was a cloudy day", start_offset: 60.639 },
      { body: "Ba de ya‚ say do you remember", start_offset: 10.333 },
      { body: "Ba de ya‚ dancing in September", start_offset: 111.0 },
      {
        body: "Ba de ya‚ golden dreams were shinny days",
        start_offset: 15.099
      },
      { body: "Love bells was ringing", start_offset: 23.235 },
      { body: "Our souls were singing", start_offset: 27.235 },
      { body: "Do you remember‚ never a cloudy day", start_offset: 31.639 },
      { body: "Ba de ya‚ say do you remember", start_offset: 39.381 },
      { body: "Ba de ya‚ dancing in September", start_offset: 42.961 },
      { body: "Ba de ya‚ never was a cloudy day", start_offset: 48.333 },
      { body: "Ba de ya‚ say do you remember", start_offset: 53.111 },
      { body: "Ba de ya‚ dancing in September", start_offset: 57.408 },
      { body: "Ba de ya‚ golden dreams were shinny days", start_offset: 3.333 },
      { body: "Ba de ya de ya de ya", start_offset: 0 },
      { body: "Ba de ya de ya de ya", start_offset: 12.408 },
      { body: "Ba de ya de ya de ya de ya", start_offset: 17.381 },
      { body: "Ba de ya de ya de ya", start_offset: 23.087 },
      { body: "Ba de ya de ya de ya", start_offset: 27.408 },
      { body: "Ba de ya de ya de ya de ya", start_offset: 32.439 }
    ]
  },
  {
    name: "Wake me up when September ends",
    artist: "Green Day",
    lyrics: [
      { body: "Summer has come and passed", start_offset: 10.724 },
      { body: "The innocent can never last", start_offset: 14.087 },
      { body: "Wake me up when September ends", start_offset: 19.449 },
      { body: "Like my father′s came to pass", start_offset: 28.961 },
      { body: "Seven years has gone so fast", start_offset: 35.226 },
      { body: "Wake me up when September ends", start_offset: 37.176 },
      {
        body: "Here comes the rain again falling from the stars",
        start_offset: 46.25
      },
      { body: "Drenched in my pain again", start_offset: 57.941 },
      { body: "Becoming who we are", start_offset: 60.639 },
      { body: "As my memory rests", start_offset: 5.923 },
      { body: "But never forgets what I lost", start_offset: 9.099 },
      { body: "Wake me up when September ends", start_offset: 14.754 },
      { body: "Summer has come and passed", start_offset: 32.235 },
      { body: "The innocent can never last", start_offset: 38.941 },
      { body: "Wake me up when September ends", start_offset: 41.25 },
      { body: "Ring out the bells again", start_offset: 61.111 },
      { body: "Like we did when spring began", start_offset: 55.887 },
      { body: "Wake me up when September ends", start_offset: 65.667 },
      {
        body: "Here comes the rain again falling from the stars",
        start_offset: 10.041
      },
      { body: "Drenched in my pain again", start_offset: 18.754 },
      { body: "Becoming who we are", start_offset: 22.389 },
      { body: "As my memory rests", start_offset: 27.724 },
      { body: "But never forgets what I lost", start_offset: 56.0 },
      { body: "Wake me up when September ends", start_offset: 36.205 },
      { body: "Summer has come and passed", start_offset: 45.22 },
      { body: "The innocent can never last", start_offset: 51.703 },
      { body: "Wake me up when September ends", start_offset: 66.5 }
    ]
  }
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Songs",
      RAW_SONGS.map(({ name, artist }, index) => ({
        id: index,
        name,
        artist,
        createdAt: new Date(),
        updatedAt: new Date()
      }))
    );

    return Promise.all(
      RAW_SONGS.map((song, index) => {
        const lyrics = RAW_SONGS[index].lyrics;

        return queryInterface.bulkInsert(
          "Lyrics",
          lyrics.map(lyric => {
            return {
              body: lyric.body,
              SongId: index,
              startOffset: lyric.start_offset,
              createdAt: new Date(),
              updatedAt: new Date()
            };
          })
        );
      })
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Lyrics", null, {});
    return queryInterface.bulkDelete("Songs", null, {});
  }
};
