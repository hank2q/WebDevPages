const exe = require("child_process").exec;
exe("echo made with javascript exec function > command.txt", function (
    jserr,
    stdout,
    stderr
) {
    if (jserr instanceof Error) {
        console.log("jserr:\n", jserr);
    }
    console.log("stdout:\n", stdout);
    console.log("stderr:\n", stderr);
});
