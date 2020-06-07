
export class ItemCalendrier {
    id: number;
    content: string;
    start: Date;
    end: Date;
    editable: boolean;
    className: string;
    constructor(id: number, content: string, start: Date, end: Date, editable: boolean, className: string) {
      this.id = id;
      this.content = content;
      this.start = start;
      this.end = end;
      this.editable = editable;
      this.className = className;
    }
  
  }
  