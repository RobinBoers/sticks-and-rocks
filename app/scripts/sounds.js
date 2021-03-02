// This file contains the variables used to play
// sound effects in various parts of the gameplay

var click = AudioFX('assets/sounds/click', { formats: ['wav'], pool: 10, volume: 1 });
var select = AudioFX('assets/sounds/select', { formats: ['wav'], pool: 10, volume: 1 });
var exit = AudioFX('assets/sounds/punch', { formats: ['wav'], pool: 10, volume: 1 });
var hurt = AudioFX('assets/sounds/hurt', { formats: ['wav'], pool: 10, volume: 1 });
var punch = AudioFX('assets/sounds/punch', { formats: ['wav'], pool: 10, volume: 1 });
var error = AudioFX('assets/sounds/error', { formats: ['wav'], pool: 10 });
var dead = AudioFX('assets/sounds/gameover', { formats: ['wav'], pool: 10 });

// I use AudioFX to take care off loading ands stuff.