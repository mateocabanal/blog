use std::{
    ffi::OsString,
    fs::{File, FileType},
    io::Read,
    net::TcpListener,
    path::{Path, PathBuf},
};
use tinyhttp::prelude::*;

use serde::Deserialize;
use serde::Serialize;
#[recursion_limit = "256"]
#[get("/get_all_priv")]
fn get_all() -> String {
    use native_json::json;
    use native_json::JSON;
    let path = Path::new("public/md/private");
    let dir_contents = Path::read_dir(path).unwrap();
    let files: Vec<String> = dir_contents
        .map(|file| file.unwrap())
        .filter(|file| file.file_name().to_str().unwrap().ends_with(".md"))
        .map(|file| file.file_name().into_string().unwrap())
        .collect();
    let str_json = json! {
        pages: files,
    };
    str_json.string().unwrap()

    //    let parsed_html: DOMTree<String> = html! (
    //        <div>
    //            <h1>"Hidden files"</h1>
    //            <ul>
    //            {
    //                files.into_iter().map(|path| {
    //                    html! (
    //                        <li><a href={path.1.to_str().unwrap()}> {text!("{}", path.0)} </a></li>
    //                    )}
    //                )
    //            }
    //            </ul>
    //        </div>
    //    );
    //    parsed_html.to_string()
}

#[get("/api/:")]
fn api(req: Request) -> Vec<u8> {
    let mut id = req.get_wildcard().unwrap().to_owned();
    id.remove(0);
    let str_path = "public/md".to_string() + &id;
    let path = Path::new(&str_path);
    if path.exists() {
        let mut file = File::open(path).unwrap();
        let mut buf = Vec::new();
        file.read_to_end(&mut buf).unwrap();
        buf
    } else {
        b"404".to_vec()
    }
}

fn main() {
    let sock = TcpListener::bind(":::3002").unwrap();
    let conf = Config::new()
        .mount_point("public/md")
        .routes(Routes::new(vec![get_all()]));
    HttpListener::new(sock, conf).start();
}
