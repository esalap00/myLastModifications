# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
    pkgs.mongosh
  ];
  # Sets environment variables in the workspace
  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "dbaeumer.vscode-eslint"
      "esbenp.prettier-vscode"
      "ms-vscode.live-server"
      "vincaslt.highlight-matching-tag"
      "Gruntfuggly.todo-tree"
      "streetsidesoftware.code-spell-checker-spanish"
      "streetsidesoftware.code-spell-checker"
    ];
    workspace = {
      # Runs when a workspace is first created with this `dev.nix` file
      onCreate = {
        npm-install = "npm install";
      };
      # To run something each time the environment is rebuilt, use the `onStart` hook
    };
    # Enable previews and customize configuration
    /* previews = {
      enable = true;
      previews = [
        {
          command = ["npm" "run" "dev" "--" "--port" "$PORT"];
          manager = "web";
          id = "web";
        }
      ];
    }; */
  };
  
  services.docker.enable = true;
}