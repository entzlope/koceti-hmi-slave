# koceti-hmi-slave

# How to run
### disable iptables
$ sudo iptables -F
$ sudo iptables -X
$ sudo iptables -P FORWARD ACCEPT

### (RTSP) run rtsp server
$ cd ~/rtsp-simple-server/
$ sudo make run

### run koceti-hmi-slave
$ cd ~/koceti-hmi-slave/
$ node app.js
