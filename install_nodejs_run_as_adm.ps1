(Set-ExecutionPolicy Unrestricted);
(Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1')));
(cinst nodejs.install --lts);
(choco install -y yarn python2 jdk8);
(yarn global add react-native-cli)