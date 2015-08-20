
var five = require('johnny-five'),
    board = new five.Board(),
    stdin = process.stdin,
    keypress = require('keypress'),
    say = require( 'say' ),
    _ = require( 'lodash' ),
    s = require( 'underscore.string' ),
    pkg = require( './package.json' );

keypress(process.stdin);
stdin.setRawMode(true);
stdin.resume();

board.on('ready', function() {
  b = this;

  // Johnny-Five provides pre-packages shield configurations!
  // http://johnny-five.io/api/motor/#pre-packaged-shield-configs
  var motors = new five.Motors([
      five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M1,
      five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M2,
    ]),
    leftMotor = motors[0],
    rightMotor = motors[1];

  var me = 'Alex',
    pikachu = 'Junior';

  var eyeBalls = new five.Led(11);

  console.log( s.capitalize( pkg.name ) + ' is Ready!' );

  say.speak( me, 'pika chu I choose you!' );

  eyeBalls.fadeIn();

  stdin.on('keypress', function (chunk, key) {
    if (!key) return;

    if (key.ctrl && key.name == 'c' || key.name == 'q') {
      eyeBalls.fadeOut();

      say.speak( me, 'pika chu return!' );

      motors.stop();
      b.wait(500, function() {
        console.log( '\n' + s.capitalize( pkg.name ) + ' goes back to his pokeball!' );

        process.exit();
      });
    }

    switch(key.name) {
      case 'up':
        motors.fwd(255);

        eyeBalls.blink();

        say.speak( pikachu, 'pika pika!' );
        break;

      case 'down':
        motors.rev(255);

        say.speak( pikachu, 'pika chu!' );
        break;

      case 'space':
        say.speak( me, 'pika chu thunderbolt now!' );

        motors.stop();
        break;

      case 'right':
        motors[1].fwd(75);
        motors[0].rev(75);
        break;

      case 'left':
        motors[0].fwd(75);
        motors[1].rev(75);
        break;

      default:
        break;
    }
  });
});
