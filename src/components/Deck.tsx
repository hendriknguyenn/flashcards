
class Deck{
    id: number;
    deck_name: string;
    question_list: string[];
    answer_list: string[];

    constructor(id, deck_name){
        this.id = id;
        this.deck_name = deck_name;
    }
}

export default Deck;