// ১. আমাদের অ্যারে
const tags = ["javascript", "react"];

// ২. URLSearchParams এর একটি নতুন অবজেক্ট তৈরি করা
const params = new URLSearchParams();

// ৩. লুপ চালিয়ে প্রতিটি আইটেমকে একই কি (key) দিয়ে যুক্ত করা
tags.forEach((tag) => {
  params.append("tags_like", tag);
});
console.log(params.toString())

// ৪. মূল URL এর সাথে কোয়েরি স্ট্রিংটি জুড়ে দেওয়া
const baseUrl = "http://localhost:9000/videos";
const finalUrl = `${baseUrl}?${params.toString()}`;

console.log(finalUrl);
// আউটপুট: http://localhost:9000/videos?tags_like=javascript&tags_like=react
