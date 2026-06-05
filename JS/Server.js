import { createClient } from 'https://esm.sh/@supabase/supabase-js'

export const likedProjects = JSON.parse(localStorage.getItem("likedProjects") || "[]");
const supabase = createClient(
    "https://kupffquyjyhacochoqic.supabase.co",
    "sb_publishable_sOR4e5chT-y5--Tt14VkGA_li_wz0zB"
);

const { data, error } = await supabase
    .from("Projects")
    .select("*");


export const dataProjects = data


export async function LikeProject(id) {
    const { error } = await supabase.rpc("increment_likes", {
        project_id: id
    });

    if (error) {
        console.error(error);
        return false;
    }

    const likedProjects = JSON.parse(
        localStorage.getItem("likedProjects") || "[]"
    );

    likedProjects.push(id);

    localStorage.setItem(
        "likedProjects",
        JSON.stringify(likedProjects)
    );

    return true;
}

export async function RemoveLikeProject(id) {
    const { error } = await supabase.rpc("decrement_likes", {
        project_id: id
    });

    if (error) {
        console.error(error);
        return false;
    }

    const likedProjects = JSON.parse(
        localStorage.getItem("likedProjects") || "[]"
    );

    const index = likedProjects.indexOf(id);

    if (index !== -1) {
        likedProjects.splice(index, 1);
    }

    localStorage.setItem(
        "likedProjects",
        JSON.stringify(likedProjects)
    );

    return true;
}