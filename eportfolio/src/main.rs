use tinyhttp::prelude::*;

fn main() {
    let socket = std::net::TcpListener::bind(":::9002").unwrap();
    let conf = Config::new().mount_point("html").gzip(true);
    let http = HttpListener::new(socket, conf);

    http.start();
}
