<?php

class Router{
  private array $routes = [];

  private function add_route(string $method, string $path, string $handler){
    $this->routes[] = [
      "method" => $method,
      "path" => $this->parse_path($path),
      "handler" => $handler
    ];
  }

  public function get_routes(){
    return $this->routes;
  }


  private function parse_path(string $path): string {        
    // Escape forward slashes in the path
    $escaped_path = str_replace('/', '\/', $path);
    // Replace dynamic segments with named capturing groups
    $pattern = str_replace(['{', '}'], ['(?P<', '>[a-zA-Z0-9\-_]+)'], $escaped_path);
    // Return the complete regular expression pattern
    return "/^{$pattern}$/";
  }

  public function get(string $path, string $controller){
    $this->add_route("GET", $path, $controller);
  }

  public function post(string $path, string $controller){
    $this->add_route("POST", $path, $controller);
  }

  public function put(string $path, string $controller){
    $this->add_route("PUT", $path, $controller);
  }

  public function delete(string $path, string $controller){
    $this->add_route("DELETE", $path, $controller);
  }

  public function run(string $method, string $uri){
    foreach ($this->routes as $route){
      if ($route["method"] === $method && preg_match($route["path"], $uri, $matches)){
        // Controller@method
        $handler = explode("@", $route["handler"]);
      
        $controller = new $handler[0]();
        $controller_method = $handler[1];
        $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);
            
        call_user_func_array([$controller, $controller_method], $params);
    
        return;
      }
    }

    http_response_code(404);
    echo json_encode(["error" => "Endpoint Not Found"]);
  }
}