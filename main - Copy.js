function calculate() {
	rates = [];
	overall = 0;
	for (var i = 0; i < 11; i++) {
		rate = document.getElementById("rate_" + i).value * 1;
		rates[i] = rate;
		overall += rate;
	}

	var result = document.getElementById("result");
	result.innerHTML = "1. 计算11名球员能力总和：<br>";
	for (var i = 0; i < 11; i++) {
		result.innerHTML += rates[i];
		if (i != 10) {
			result.innerHTML += " + ";
		}
	}
	result.innerHTML += " = " + overall + "<br>";

	average = overall / 11;
	average_1 = Math.floor(overall / 11);
	average_2 = overall - average_1 * 11;
	if (average_2 != 0) {
		result.innerHTML += "2. 计算11名球员能力平均值：<br>" + overall + " &divide 11 = " + average_1 + " <div class='frac'><span>" + average_2 + "</span><span class='symbol'>/</span><span class='bottom'>11</span></div><br>";

		result.innerHTML += "3. 首发高于平均值的球员总评：";
		counter = 0;
		for (var i = 0; i < 11; i++) {
			if (rates[i] > average) {
				if (counter != 0) {
					result.innerHTML += "，";
				}
				result.innerHTML += rates[i];
				counter++;
			}
		}
		result.innerHTML += "。共" + counter + "个，修正值：<br>";
		correction_1 = counter * (11 - average_2) / 11;
		correction_2_1 = Math.round(correction_1);
		result.innerHTML += "<div class='frac'><span>" + (11 - average_2) + "</span><span class='symbol'>/</span><span class='bottom'>11</span></div> &times " + counter + " = <div class='frac'><span>" + counter * (11 - average_2) + "</span><span class='symbol'>/</span><span class='bottom'>11</span></div>" + " = " + correction_1 + " &rarr; " + correction_2_1 + "<br>";

		result.innerHTML += "4. 首发总评高于" + (average_1 + 1) + "：";
		counter = 0;
		for (var i = 0; i < 11; i++) {
			if (rates[i] > average_1 + 1) {
				if (counter != 0) {
					result.innerHTML += "，";
				}
				result.innerHTML += rates[i];
				counter++;
			}
		}
		result.innerHTML += "。修正值：<br>";
		sum1 = 0;
		for (var i = 0; i < 11; i++) {
			if (rates[i] > average_1 + 1) {
				if (sum1 != 0) {
					result.innerHTML += " + ";
				}
				result.innerHTML += (rates[i] - average_1 - 1);
				sum1 += rates[i] - average_1 - 1;
			}
		}
		result.innerHTML += " = " + sum1 + "<br>";

		result.innerHTML += "6. 最终结果：<br>";
		final_result = (overall + correction_2_1 + sum1) / 11;
		final_result_1 = Math.floor(final_result);
		final_result_2 = overall + correction_2_1 + sum1 - final_result_1 * 11;
		if (final_result_2 != 0) {
			result.innerHTML += "(" + overall + " + " + correction_2_1 + " + " + sum1 +") &divide 11 = " + final_result_1 + " <div class='frac'><span>" + final_result_2 + "</span><span class='symbol'>/</span><span class='bottom'>11</span></div> = " + final_result + " &rarr; " + Math.floor(final_result);
		}
		else {
			result.innerHTML += "(" + overall + " + " + correction_2_1 + " + " + sum1 +") &divide 11 = " + final_result_1;
		}
	}
	else {
		result.innerHTML += "2. 计算11名球员能力平均值：<br>" + overall + " &divide 11 = " + average_1 + "<br>";

		result.innerHTML += "3. 总评高于" + average_1 + "：";
		counter = 0;
		for (var i = 0; i < 11; i++) {
			if (rates[i] > average_1) {
				if (counter != 0) {
					result.innerHTML += "，";
				}
				result.innerHTML += rates[i];
				counter++;
			}
		}
		result.innerHTML += "。修正值：<br>";
		sum = 0;
		for (var i = 0; i < 11; i++) {
			if (rates[i] > average_1) {
				if (sum != 0) {
					result.innerHTML += " + ";
				}
				result.innerHTML += rates[i] - average_1;
				sum += rates[i] - average_1;
			}
		}
		result.innerHTML += " = " + sum + "<br>";

		result.innerHTML += "4. 最终结果：<br>";
		final_result = (overall + sum) / 11;
		final_result_1 = Math.floor(final_result);
		final_result_2 = overall + sum - final_result_1 * 11;
		if (final_result_2 != 0) {
			result.innerHTML += "(" + overall + " + " + sum +") &divide 11 = " + final_result_1 + " <div class='frac'><span>" + final_result_2 + "</span><span class='symbol'>/</span><span class='bottom'>11</span></div> = " + final_result + " &rarr; " + Math.floor(final_result);
		}
		else {
			result.innerHTML += "(" + overall + " + " + sum +") &divide 11 = " + final_result_1;
		}	
	}
}