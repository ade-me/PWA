{pkgs}: {
  deps = [
    pkgs.postgresql
    pkgs.openssl
    pkgs.glibcLocales
    pkgs.xsimd
    pkgs.pkg-config
    pkgs.libxcrypt
    pkgs.re2
    pkgs.oneDNN
  ];
}
