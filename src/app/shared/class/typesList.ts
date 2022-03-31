export class TypesList{
    nom: string;
    checked:boolean;
    disabled:boolean;
    listTypes:any;

    constructor(){
        this.listTypes = [

            {
                nom: "Sms",
                checked:false,
                disabled:false
            },
            {
                nom: "App",
                checked:false,
                disabled:false
            },
            {
                nom: "Email",
                checked:false,
                disabled:false
            }    
        ];
    }
}