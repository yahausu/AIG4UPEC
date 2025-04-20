
import { defineField, defineType } from "sanity";
export const startup = defineType({
    name: "startup",
    type: "document",
    title: 'Startup',
    fields : [
        defineField({
            name:'title',
            type:'string',

        }),
        defineField({
            name:'slug',
            type:'slug',
            options: {
                source:'title'
            }

        }),
        defineField({
            name:'author',
            type:'reference',
            to:{
                type : "author"
            }

        }),defineField({
            name:'description',
            type:'text',

        }),
        defineField({
            name:'category',
            type:'string',
            validation : (Rule) => Rule.min(1).max(20).required().error("Plase enter a category")

        }),
        defineField({
            name:'views',
            type:'number',

        }),
        defineField({
            name:'image',
            type:'url',
            validation: (Rule) => Rule.required().error("Please enter an image"),

        }),
        defineField({
            name:'pitch',
            type:'markdown',

        }),
    ],
    
})