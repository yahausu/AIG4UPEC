import { defineQuery } from "next-sanity"

export const STARTUPS_QUERY= defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search  || author -> name match $search]| order(_createdAt desc)
    {
    _id,title,slug, _createdAt, image,
      author -> { name,bio, image,bio, _id}
      ,views , description, category
  }`);

export const STARTUP_BY_ID_QUERY = defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id,title,slug, _createdAt, image,
    author -> { name,bio, username ,image,bio, _id}
    ,views , description, category , pitch
}`)