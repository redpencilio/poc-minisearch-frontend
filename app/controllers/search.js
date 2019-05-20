import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { parallel } from 'ember-animated';
import { easeIn, easeOut } from 'ember-animated/easings/cosine';
import move from 'ember-animated/motions/move';
import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';

export default class SearchController extends Controller {
  @service search;

  *transition({ insertedSprites, keptSprites, removedSprites }) {
    if( keptSprites.length == 0 && removedSprites.length == 0 ) {
      console.log("animate from empty");
      insertedSprites.forEach( sprite => {
        sprite.startAtPixel({ y:window.innerHeight });
        parallel(
          fadeIn(sprite),
          move(sprite, { easing: easeIn }));
      });
      // fade from bottom
    } else {
      console.log("animate from stuff");

      insertedSprites.forEach( sprite => {
        // sprite.startAtPixel( { x: - sprite.finalBounds.width  } );
        // parallel(
        //   fadeIn(sprite),
        //   move( sprite, { easing: easeIn } ));
        sprite.startAtPixel( { x: sprite.finalBounds.left - 20 } );
        parallel(
          move( sprite ),
          fadeIn(sprite)
        );
      } );

      keptSprites.forEach(sprite => {
        move(sprite, { easing: easeIn });
      });

      removedSprites.forEach(sprite => {
        // we should animate the removed sprites but that didn't seem
        // to work off the bat
      });
    }
  }
}
