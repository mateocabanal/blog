use std::{net::TcpListener, path::Path, fs::File, io::Read};
use tinyhttp::prelude::*;

#[get("/api/:")]
fn api(req: Request) -> Vec<u8> {
    let mut id = req.get_wildcard().unwrap();
    id.remove(0);
    let str_path = "public/md".to_string() + &id;
    println!("FILE: {}", str_path);
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
    let conf = Config::new().mount_point("public/md");
    HttpListener::new(sock, conf).start();
}
