precision mediump float;

uniform vec2 resolution;
uniform float time;

float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
    uv.x += time * 0.4;

//    float d = dot(uv.x, uv.x)*50.0;
    float d = fract(uv.x * 10.0);
    float l = step(0.5, length(d));
    vec3 color = mix(vec3(0.02, 0.5, 1.0), vec3(0.8, 0.6, 0.3), l);
    color = sqrt(color);

    gl_FragColor = vec4(color, 1.0);
}