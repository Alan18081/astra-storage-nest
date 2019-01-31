\c as_users_service

delete from "user_hash";
delete from "user";

\c as_projects_service

delete from "storage";
delete from "project_account";
delete from "project";

\c as_auth_service

delete from "refresh_token";