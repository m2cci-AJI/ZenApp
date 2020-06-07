import { sessionYoga } from '../yoga.enum';
import { Meditation } from '../meditation.enum';
import { Respiration } from '../pranayama/respiration.enum';
import { Comment } from './comment.model';


export class Yoga {
  idYogi: string;
  typeYoga: sessionYoga;
  sousTypeYoga: Meditation | Respiration;
  durationYoga: number;
  start: Date;
  end: Date;
  comment: Comment;
  img: string;

  constructor(idYogi: string, typeYoga: sessionYoga, sTypeYoga: any, durYoga: number, start: Date, end: Date, comment: Comment, img: string) {
      this.idYogi = idYogi;
      this.typeYoga = typeYoga;
      this.sousTypeYoga = sTypeYoga;
      this.durationYoga = durYoga;
      this.start = start;
      this.end = end;
      this.comment = comment;
      this.img = img;
  }

}
