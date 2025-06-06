import { pgTable, text, uuid, integer, boolean } from "drizzle-orm/pg-core";
import { relations, Relations } from "drizzle-orm";
import { timestamp } from "drizzle-orm/pg-core";

export const files = pgTable("files", {
  id: uuid("id").defaultRandom().primaryKey(),

  //basic file / folder information
  name: text("name").notNull(),
  path: text("path").notNull(), // /document/project/resume
  size: integer("size").notNull(),
  type: text("type").notNull(), // It will show the type of our image like it is a png or jpg and type of our folder

  //storage information
  fileUrl: text("file_url").notNull(), //url to access the file
  thumbnailUrl: text("thumbnail_url"),

  //Ownership Information
  userId: text("user_id").notNull(),
  parentId: uuid("parent_id"), //parent foldet id like /document/project/resume so, here parent of document is null, parent of project is document and parent of resume is project

  //boolean file/folder flag
  isFolder: boolean("is_folder").default(false).notNull(), // ye aap ko batayega ki jo upload kr rhe ho vo file h ya folder h (badi companys m yhi hota h like agar tum n koi favourate pe click kiya , starmark pe click kiya toh usse ki flag value true ho jati h (so, saari chezze boolean m hoti h ))
  isStarred: boolean("is_starred").default(false).notNull(),
  isTrash: boolean("is_trash").default(false).notNull(),

  //for knowledge (mainly used in mongodb)
  //   Timestamp
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/*
parent : Each file/folder can have one parent folder
children: Each folder can many child files/folder
*/
export const filesRelations = relations(files, ({ one, many }) => ({
  parent: one(files, {
    fields: [files.parentId], //this is forigen key in this table
    references: [files.id],
  }),

  children: many(files),
}));

//Optinal Part // Type definations

export const File = typeof files.$inferSelect;
export const NewFile = typeof files.$inferInsert;
