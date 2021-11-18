export class Task{
        constructor(
                public id: number,
                public description: string,
                public folder: string,
                public complete: boolean
        ){}
}