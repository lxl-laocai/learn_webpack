export default function foo(name: string, value: string) {
  return name.includes(value);
}
console.log("ts", foo("name", "n"));
