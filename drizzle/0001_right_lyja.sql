ALTER TABLE "games" DROP CONSTRAINT "games_modality_id_modalities_id_fk";
--> statement-breakpoint
ALTER TABLE "players" DROP CONSTRAINT "players_team_id_teams_id_fk";
--> statement-breakpoint
ALTER TABLE "players" DROP CONSTRAINT "players_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "teams" DROP CONSTRAINT "teams_modality_id_modalities_id_fk";
--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_course_id_courses_id_fk";
--> statement-breakpoint
ALTER TABLE "games" ADD CONSTRAINT "games_modality_id_modalities_id_fk" FOREIGN KEY ("modality_id") REFERENCES "public"."modalities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "players" ADD CONSTRAINT "players_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "players" ADD CONSTRAINT "players_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teams" ADD CONSTRAINT "teams_modality_id_modalities_id_fk" FOREIGN KEY ("modality_id") REFERENCES "public"."modalities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;